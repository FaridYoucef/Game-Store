import stripe
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Payment
from order.models import Order
from django.shortcuts import get_object_or_404  # For better error handling

stripe.api_key = settings.STRIPE_SECRET_KEY

# Create Payment Intent
@api_view(['POST'])
def create_payment_intent(request):
    try:
        # Retrieve the order ID and additional fields from request data
        order_id = request.data.get('order_id')
        account_holder_name = request.data.get('account_holder_name')
        account_number = request.data.get('account_number')
        country = request.data.get('country')

        # Ensure the order exists and is associated with the current user
        order = get_object_or_404(Order, id=order_id, user=request.user)

        # Calculate the amount for the payment (convert to cents)
        amount = int(order.total_amount * 100)  # Stripe expects amount in cents

        # Create a PaymentIntent with Stripe
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='usd',
            payment_method_types=['card'],
            metadata={
                'account_holder_name': account_holder_name,
                'account_number': account_number,
                'country': country,
            }
        )
        
        # Create Payment record in our database
        payment = Payment.objects.create(
            user=request.user,
            order=order,
            amount=order.total_amount,
            stripe_payment_intent=intent['id'],
            status='pending'
        )
        
        # Return the client_secret and payment ID to the frontend
        return Response({
            'client_secret': intent['client_secret'],
            'payment_id': payment.id
        })
    
    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    
    # Confirm Payment
@api_view(['POST'])
def confirm_payment(request):
    try:
        payment_id = request.data.get('payment_id')
        payment = Payment.objects.get(id=payment_id, user=request.user)
        
        # Retrieve the PaymentIntent to check the status
        intent = stripe.PaymentIntent.retrieve(payment.stripe_payment_intent)
        
        if intent.status == 'succeeded':
            # Update payment status to 'completed'
            payment.status = 'completed'
            payment.save()
            return Response({'message': 'Payment completed successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Payment not completed'}, status=status.HTTP_400_BAD_REQUEST)
    
    except Payment.DoesNotExist:
        return Response({'error': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

