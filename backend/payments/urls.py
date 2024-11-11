from django.urls import path
from .views import create_payment_intent, confirm_payment

urlpatterns = [
    path('api/create-payment-intent/', create_payment_intent, name='create_payment_intent'),
    path('api/confirm-payment/', confirm_payment, name='confirm_payment'),
]