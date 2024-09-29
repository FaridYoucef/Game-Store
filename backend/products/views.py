from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import generics
from rest_framework.response import Response
from .models import Category, Product, Brand
from .serializers import ProductSerializer, CategorySerializer, BrandSerializer
from django.http import HttpResponse

# Create your views here.
class productListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        # Retrieve the 'category' parameter from the request
        category_slug = self.request.query_params.get('category', None)
        if category_slug:
             # Filter products by the category slug if provided
            return Product.objects.filter(category__slug=category_slug, available=True)
         # Return all available products if no category is specified
        return Product.objects.filter(available=True)
    
    
class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(available=True)
    serializer = ProductSerializer
    lookup_field = 'slug'
    
class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.filter(navbar_display=True)
    serializer_class = CategorySerializer

@api_view(['GET']) 
def navbar_categories(request): 
    # Filter categories that should be displayed in the navbar
    categories = Category.objects.filter(navbar_display=True)
    data = [
        {"name": category.name, "slug": category.slug}
        for category in categories
    ]
    return Response({"categories": data})

class BrandListView(generics.ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    
def home(request):
    return HttpResponse("<h1>Welcome to the Game Store!</h1>")