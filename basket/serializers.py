from rest_framework import serializers
from .models import BasketItem
from products.models import Product

class BasketItemSerializer(serializers.ModelSerializer):
    Product_name = serializers.ReadOnlyField(source='product.name')
    
    class Meta:
        model = BasketItem
        fields = ['id', 'product', 'product_name', 'quantity', 'added_on']