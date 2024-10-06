from django.db import models
from django.urls import reverse
from datetime import datetime


# Create your models here
class Category(models.Model):
    name = models.CharField(max_length=250)
    slug = models.SlugField(unique=True)
    navbar_display = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "categories"

    def __str__(self):
        return self.name

class Brand(models.Model):
    name = models.CharField(max_length=100)
    logo = models.ImageField(upload_to='brand_logos/')
    website = models.URLField(blank=True, null=True)

class Product(models.Model):
   
    
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    brand = models.ForeignKey(Brand, related_name='products', on_delete=models.CASCADE)
    available = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='products', blank=True, null=True)
    
    TYPE_CHOICES = [
        ('games', 'Games'),
        ('consoles', 'Consoles'),
        ('accessories', 'Accessories'),
    ]
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('products:product_detail', kwargs={'id': self.id, 'slug': self.slug})