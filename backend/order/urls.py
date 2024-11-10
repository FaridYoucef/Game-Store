from django.urls import path
from .views import create_order, get_order, set_delivery

urlpatterns = [
    path('create/', create_order, name='create_order'),
    path('<int:order_id>/', get_order, name='get_order'),
    path('<int:order_id>/set_delivery/', set_delivery, name='set_delivery'),
]
