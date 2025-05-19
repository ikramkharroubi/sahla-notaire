from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ApplicationViewSet,
    RequiredDocumentViewSet,
    PaymentTransactionViewSet,
    NotificationViewSet
)

router = DefaultRouter()
router.register(r'documents', RequiredDocumentViewSet, basename='required-document')
router.register(r'payments', PaymentTransactionViewSet, basename='payment-transaction')
router.register(r'notifications', NotificationViewSet, basename='notification')
router.register(r'', ApplicationViewSet, basename='application')

urlpatterns = [
    path('', include(router.urls)),
]
