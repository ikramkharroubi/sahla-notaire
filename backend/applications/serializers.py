from rest_framework import serializers
from .models import Application, ApplicationStatus, RequiredDocument, PaymentTransaction, Notification

class ApplicationStatusSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source='created_by.get_full_name', read_only=True)
    
    class Meta:
        model = ApplicationStatus
        fields = ['id', 'status', 'notes', 'created_by', 'created_by_name', 'created_at']
        read_only_fields = ['created_by', 'created_at']

class RequiredDocumentSerializer(serializers.ModelSerializer):
    verified_by_name = serializers.CharField(source='verified_by.get_full_name', read_only=True)
    
    class Meta:
        model = RequiredDocument
        fields = ['id', 'name', 'description', 'is_mandatory', 'document',
                 'is_submitted', 'is_verified', 'submitted_at', 'verified_at',
                 'verified_by', 'verified_by_name']
        read_only_fields = ['is_verified', 'verified_at', 'verified_by']

class PaymentTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentTransaction
        fields = ['id', 'amount', 'description', 'transaction_id',
                 'payment_method', 'status', 'created_at', 'completed_at']
        read_only_fields = ['created_at', 'completed_at']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'title', 'message', 'notification_type', 
                 'application', 'is_read', 'created_at']
        read_only_fields = ['created_at']

class ApplicationSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    service_name = serializers.CharField(source='service.title', read_only=True)
    
    class Meta:
        model = Application
        fields = ['id', 'user', 'user_name', 'service', 'service_name',
                 'reference_number', 'submission_date', 'status', 'notes',
                 'is_urgent']
        read_only_fields = ['user', 'reference_number', 'submission_date']

class ApplicationDetailSerializer(ApplicationSerializer):
    status_history = ApplicationStatusSerializer(many=True, read_only=True)
    required_documents = RequiredDocumentSerializer(many=True, read_only=True)
    payments = PaymentTransactionSerializer(many=True, read_only=True)
    
    class Meta(ApplicationSerializer.Meta):
        fields = ApplicationSerializer.Meta.fields + ['status_history', 'required_documents', 'payments']
