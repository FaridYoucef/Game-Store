from django.shortcuts import render
from rest_framework import generics
from .models import Category, Product, Brand
from .serializers import ProductSerializer, CategorySerializer, BrandSerializer
from django.http import HttpResponse

# Create your views here.
class productListView(generics.ListAPIView):
    queryset = Product.objects.filter(available=True)
    serializer_class = ProductSerializer
    
class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(available=True)
    serializer = ProductSerializer
    lookup_field = 'slug'
    
class CategoryListView(generics.ListAPIView):
    querySet = Category.objects.all()
    serializer_class = CategorySerializer
    
class BrandListView(generics.ListAPIView):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    
def home(request):
    return HttpResponse("<h1>Welcome to the Game Store!</h1>")