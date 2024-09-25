from django.db import models
from django.contrib.auth.models import User
from order.models import Order

class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    strip_payment_intent = models.CharField( max_length=255, blank=True, null=True)
    status = models.CharField( max_length=50, default='pending')
    created_at = models.DateTimeField( auto_now=True)
    
    def __str__(self):
        return f"Payment of {self.amount} by {self.user.username} for Order {self.order.id}"


