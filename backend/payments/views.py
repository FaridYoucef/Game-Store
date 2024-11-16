import stripe
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.shortcuts import get_object_or_404
from .models import Payment, Order

stripe.api_key = settings.STRIPE_SECRET_KEY

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_payment_create(request):
    print("Received request:", request.data)  # Log incoming request data
    order_id = request.data.get("order_id")
    card_info = request.data.get("card_info")
    username = request.data.get("username")

    try:
        order = Order.objects.get(id=order_id, user=request.user)
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

    amount = order.total_price  

    # Create a Payment record
    payment = Payment.objects.create(
        user=request.user,
        order=order,
        amount=amount,
        status="pending"
    )

    try:
        # Create a PaymentIntent with automatic payment methods
        payment_intent = stripe.PaymentIntent.create(
            amount=int(amount * 100), 
            currency="usd",
            payment_method_data={
                "type": "card",
                "card": card_info,
                "billing_details": {"name": username},
            },
            confirm=True,
            automatic_payment_methods={
                "enabled": True,
                "allow_redirects": "never",  # Prevent redirects
            },
        )

        payment.stripe_payment_intent = payment_intent.id
        payment.status = "processing" if payment_intent.status == "requires_confirmation" else "failed"
        payment.save()

        return Response({"payment_intent": payment_intent.id, "status": payment.status}, status=status.HTTP_200_OK)

    except stripe.error.CardError as e:
        payment.status = "failed"
        payment.save()
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_payment_finalize(request, payment_id):
    payment = get_object_or_404(Payment, id=payment_id, user=request.user)

    try:
        payment_intent = stripe.PaymentIntent.retrieve(payment.stripe_payment_intent)
        payment.status = "completed" if payment_intent.status == "succeeded" else "failed"
        payment.save()
        
        return Response({"status": payment.status}, status=status.HTTP_200_OK if payment.status == "completed" else status.HTTP_400_BAD_REQUEST)

    except stripe.error.StripeError as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)