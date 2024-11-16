from django.urls import path
from . import views

urlpatterns = [
    path('payment/create/', views.api_payment_create, name='api-payment-create'),
    path('payment/finalize/<int:payment_id>/', views.api_payment_finalize, name='api-payment-finalize'),
]
