from django.shortcuts import render
from .models import Category, Product
from django.http import HttpResponse

# Create your views here.
def product_list(request, category_slug):
    catergory = None
    products = Product.objects.filter(available)
    
def home(request):
    return HttpResponse("<h1>Welcome to the Game Store!</h1>")