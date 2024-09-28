import stripe
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Payment
from order.models import Order
from .serializers import PaymentSerializer

stripe.api_key = settings.STRIPE_SECRET_KEY

# Create Payment Intent
@api_view(['POST'])
def create_payment_intent(request):
    try:
        # Retrieve the order and calculate amount
        order_id = request.data.get('order_id')
        order = Order.objects.get(id=order_id, user=request.user)
        amount = int(order.total_amount * 100)
        
        # Create a PaymentIntent
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='usd',
            payment_method_types=['card'],
        )
        
        # Create Payment object in our system
        payment = Payment.objects.create(
            user=request.user,
            order=order,
            amount=order.total_amount,
            stripe_payment_intent=intent['id'],
            status='pending'
        )
        
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
        
        # Verify Payment Status
        intent= stripe.PaymentIntent.retrieve(payment.stripe_payment_intent)
        
        if intent.status =='succeeded':
            payment.status = 'completed'
            payment.save()
            return Response({'message': 'Payment completed successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'message':'Payment not completed'}, status=status.HTTP_400_BAD_REQUEST)
    except Payment.DoesNotExist:
        return Response({'error': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        
            