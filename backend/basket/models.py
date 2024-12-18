from django.db import models
from django.contrib.auth.models import User
from products.models import Product

class BasketItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    added_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{self.quantity} x {self.product.name} in {self.user.username}'s basket"




