from rest_framework import serializers
from .models import Order, OrderItem
from products.models import Product

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source = 'product.name')
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price']
        
class OrderSerializer(serializers.ModelSerializer):
    
      item = OrderItemSerializer(many=True)
      
      class Meta:
          model = Order
          fields =  ['id', 'user', 'created_at', 'total_price', 'status', 'items']
      
      
      
      
      
      
    