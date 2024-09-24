from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from products import views 
 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('products.urls')),
    path('api/', include('user.urls')),
    path('api/', include('basket.urls')),
    path('api/order/', include('order.urls')),
    path('', views.home, name='home'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

