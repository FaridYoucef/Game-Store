from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Order, OrderItem
from products.models import Product
from .serializers import OrderSerializer


@api_view(['POST'])
def create_order(request):
    user = request.user
    data = request.data
    order_items = data.get('items',[])
    
    if not order_items:
        return Response({"error":" No items in the orser"}, status=status.HTTP_404_NOT_FOUND)
    
    total_price = 0
    
    # Loop through each item in the order and calculate the total price
    for item in order_items:
        try:
            product = Product.objects.get(id=item['product_id']) # Check if the product exists
        except Product.DoesNotExist:   
            return Response({"error": f"Product with id {item['product_id']} not found"}, status=status.HTTP_404_NOT_FOUND)
        
        total_price += product.price * item['quantity'] 
        # Create the order in the database
        order = Order.objects.create(user=user, total_price=total_price)
        
        for item in order_items:
            product = Product.objects.get(id=item['product_id'])
            OrderItem.objects.create(order=order, product=product, quantity=item['quantity'], price=product.price)
            
        serializer = OrderSerializer(order)
        return Response (serializer.data, status=status.HTTP_201_CREATED)
    
    
# API view to retrieve the details of a specific order
@api_view(['GET'])
def get_order(reques, order_id):
    try:
        order = Order.objects.get(id=order_id, user=request.user)  # Get the order by ID and ensure it belongs to the current user
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
        
    # Serialize the order and return it in the response
    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
    
