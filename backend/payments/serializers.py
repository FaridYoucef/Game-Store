from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'user', 'order', 'amount', 'stripe_payment_intent', 'status', 'created_at']
        read_only_fields = ['created_at', 'stripe_payment_intent', 'status']
