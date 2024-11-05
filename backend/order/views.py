from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Order, OrderItem
from products.models import Product
from .serializers import OrderSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    data = request.data
    order_items = data.get('items', [])

    # Check if order items exist
    if not order_items:
        return Response({"error": "No items in the order"}, status=status.HTTP_400_BAD_REQUEST)

    total_price = 0
    order = Order.objects.create(user=user, total_price=0)  # Initialize order with total_price 0

    for item in order_items:
        if 'product_id' not in item:
            return Response({"error": "Product ID is missing from the order items"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id=item['product_id'])  # Check if the product exists
            quantity = item.get('quantity', 1)  # Default quantity to 1 if not provided
        except Product.DoesNotExist:
            return Response({"error": f"Product with id {item['product_id']} not found"}, status=status.HTTP_404_NOT_FOUND)

        total_price += product.price * quantity  # Accumulate the total price
        OrderItem.objects.create(order=order, product=product, quantity=quantity, price=product.price)

    # Set the total price after adding all items
    order.total_price = total_price
    order.save()  # Save the order with the calculated total price

    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order(request, order_id):
    try:
        order = Order.objects.get(id=order_id, user=request.user)
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
        
    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_200_OK)
