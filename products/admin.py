from django.contrib import admin
from .models import Product, Category, Brand

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'available')
    prepopulated_fields = {"slug": ("name",)}

admin.site.register(Category)
admin.site.register(Brand)