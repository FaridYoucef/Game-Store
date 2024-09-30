from rest_framework import serializers
from .models import Product, Category , Brand

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'slug']
        
class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id', 'name', 'website']
        
class ProductSerializer(serializers.ModelSerializer):
    brand = serializers.CharField(source='brand.name', read_only=True)
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'slug', 'price', 'brand', 'available',
             'created', 'updated', 'image' 
        ]