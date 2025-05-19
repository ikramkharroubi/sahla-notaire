"""
URL configuration for civicease project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import api_root

# Swagger imports
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Create Swagger schema view
schema_view = get_schema_view(
   openapi.Info(
      title="CivicEase API",
      default_version='v1',
      description="API for CivicEase - Government Services Platform",
      terms_of_service="https://www.civicease.ma/terms/",
      contact=openapi.Contact(email="contact@civicease.ma"),
      license=openapi.License(name="Proprietary"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', api_root),
    
    # API documentation with Swagger
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    
    # API endpoints - keep only what we need
    path('api/auth/', include('users.urls')),
    path('api/documents/', include('documents.urls')),
    path('api/procedures/', include('procedures.urls')),
    path('api/content/', include('content.urls')),
    path('api/services/', include('services.urls')),
]

# Add media URL for development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
