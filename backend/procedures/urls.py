from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProcedureViewSet, ServiceCategoryViewSet

router = DefaultRouter()
router.register(r'categories', ServiceCategoryViewSet, basename='service-category')
router.register(r'', ProcedureViewSet, basename='procedure')

urlpatterns = [
    path('', include(router.urls)),
]
