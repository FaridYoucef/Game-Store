from rest_framework import serializers
from .models import BasketItem
from products.models import Product

class BasketItemSerializer(serializers.ModelSerializer):
    # Use SerializerMethodField to include the product's name
    product_name = serializers.SerializerMethodField()

    class Meta:
        model = BasketItem
        fields = ['id', 'product', 'product_name', 'quantity'] 
    def get_product_name(self, obj):
        # Ensure the product name is accessible if the relationship is set up
        return obj.product.name if obj.product else None
