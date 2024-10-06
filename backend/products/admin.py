from django.contrib import admin
from .models import Product, Category, Brand

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'available')
    prepopulated_fields = {"slug": ("name",)}

admin.site.register(Category)
admin.site.register(Brand)

# class ProductAdmin(admin.ModelAdmin):
#     list_display = ('name', 'category', 'type', 'price', 'available')
#     prepopulated_fields = {'slug': ('name',)}
#     list_filter = ('category', 'type', 'available')
#     search_fields = ('name', 'description')

# class CategoryAdmin(admin.ModelAdmin):
#     list_display = ('name', 'slug', 'navbar_display')
#     prepopulated_fields = {'slug': ('name',)}

# class BrandAdmin(admin.ModelAdmin):
#     list_display = ('name', 'website')

# admin.site.register(Category, CategoryAdmin)
# admin.site.register(Product, ProductAdmin)
# admin.site.register(Brand, BrandAdmin)