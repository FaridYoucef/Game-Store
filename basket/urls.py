from django.urls import path
from .views import add_to_basket, get_basket, remove_from_basket, update_basket_item

urlpatterns = [
    path('add/', add_to_basket, name='add_to_basket'),
    path('list/', get_basket, name='get_basket'),
    path('remove/<int:item_id>/', remove_from_basket, name='remove_from_basket'),
    path('update/<int:item_id>/', update_basket_item, name='update_basket_item'),
]
