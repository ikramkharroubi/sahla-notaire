from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    OfficeCategoryViewSet,
    AdministrationOfficeViewSet,
    OfficeHoursViewSet,
    OfficeServiceViewSet,
    AppointmentViewSet
)

router = DefaultRouter()
router.register(r'categories', OfficeCategoryViewSet)
router.register(r'hours', OfficeHoursViewSet, basename='office-hours')
router.register(r'services', OfficeServiceViewSet, basename='office-service')
router.register(r'appointments', AppointmentViewSet, basename='appointment')
router.register(r'', AdministrationOfficeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
