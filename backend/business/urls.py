from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    BusinessTypeViewSet,
    BusinessViewSet,
    BusinessLicenseViewSet,
    TaxRegistrationViewSet,
    ComplianceCheckViewSet
)

router = DefaultRouter()
router.register(r'types', BusinessTypeViewSet)
router.register(r'licenses', BusinessLicenseViewSet, basename='business-license')
router.register(r'tax', TaxRegistrationViewSet, basename='tax-registration')
router.register(r'compliance', ComplianceCheckViewSet, basename='compliance-check')
router.register(r'', BusinessViewSet, basename='business')

urlpatterns = [
    path('', include(router.urls)),
]
