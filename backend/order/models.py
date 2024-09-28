from django.db import models
from django.contrib.auth.models import User 
from products.models import Product

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default="pending")
    
    def __str__(self):
        return f"Order {self.id} by {self.user.username}"
    


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='name', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f"{self.quantity} of {self.product.name} in order {self.order.id}"

# Create your models here.