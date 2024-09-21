from django.urls import path
from .views import productListView, ProductDetailView, CategoryListView, BrandListView

urlpatterns =[
    path('products/', productListView.as_view(), name='product-list'),
    path('products/<slug:slug>', ProductDetailView.as_view(), name='product-detail'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('brands/', BrandListView.as_view(), name='brand-list'),   
]