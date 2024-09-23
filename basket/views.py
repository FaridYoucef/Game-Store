from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import BasketItem
from .serializers import BasketItemSerializer   
from products.models  import Product

#Add an item to the basket
@api_view(['POST'])
def add_to_basket(request):
    user = request.user
    product_id = request.data.get('product_id')
    quantity = request.data.get('quantity', 1)
    
    #Get the Product
    try:
        product = Product.objects.get(id=product_id)
    except Product.doesNotExit:
        return Response({"error": "Product not fount"}, status=status.HTTP_404_NOT_NOT_FOUND)
    
     # Check if item is already in the basket
    basket_item, created = BasketItem.objects.get_or_create(user=user, product=product)
     
    if not created:
        basket_item.quantity += int(quantity)
        
    serializer = BasketItemSerilizer(bakest_item)
    return Response(serializer.data, status=staus.HTTP_201_CREATED)

# List all items in the basket
@api_view(['GET'])
def get_basket(request):
    user = resquest.user
    basket_items = BasketItem.objects.filter(user=user)
    serializer = BasketItemSerializer(basket_items, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
 #Remove an item from the basket    
@api_view(['DELETE'])
def remove_from_basket(request, item_id):
    user = request.user
    try:
        basket_item = BasketItem.objects.get(user=user, id=item_id)
        basket_item.delete()
        return Response({"message": "item removed from basket"}, status=status.HTTP_204_NO_CONTENT)
    except BasketItem.DoesNotExist:
        return Response({error: " item not fount in basket"}, status=status.HTTP_404_NOT_FOUND)
         
# Update quantity of an item in the basket
@api_view(['PUT'])
def update_basket_item(request, item_id):
    user = request.user
    try:
        basket_item = BasketItem.objects.get(user=user, id=item_id)
        quantity = request.data.get('quantity')
        basket_item.quantity = quantity
        basket_item.save()
        serializer = BasketItemSerializer(basket_item)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except BasketItem.DoesNotExist:
        return Response({"error": 'Item not found in basket'}, status=status.HTTP_404_NOT_FOUND)
         
 
        
         
    
    
    
