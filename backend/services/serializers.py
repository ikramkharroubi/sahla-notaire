from rest_framework import serializers
from .models import ServiceCategory, Service, ServiceRequirement, ServiceFee, ServiceRating, ServiceReview

class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = ['id', 'name', 'description', 'parent', 'icon']

class ServiceRequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceRequirement
        fields = ['id', 'name', 'description', 'is_mandatory']

class ServiceFeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFee
        fields = ['id', 'name', 'amount', 'description']

class ServiceRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceRating
        fields = ['id', 'rating', 'created_at']
        read_only_fields = ['created_at']

class ServiceReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()
    
    class Meta:
        model = ServiceReview
        fields = ['id', 'rating', 'review_text', 'created_at', 'user_name']
        read_only_fields = ['created_at']
    
    def get_user_name(self, obj):
        return obj.user.get_full_name() or obj.user.username

class ServiceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    average_rating = serializers.SerializerMethodField()
    
    class Meta:
        model = Service
        fields = ['id', 'title', 'description', 'category', 'category_name', 
                 'processing_time', 'eligibility_criteria', 'is_online', 
                 'created_at', 'updated_at', 'average_rating']
    
    def get_average_rating(self, obj):
        ratings = obj.ratings.all()
        if not ratings:
            return None
        return sum(r.rating for r in ratings) / len(ratings)

class ServiceDetailSerializer(ServiceSerializer):
    requirements = ServiceRequirementSerializer(many=True, read_only=True)
    fees = ServiceFeeSerializer(many=True, read_only=True)
    reviews = ServiceReviewSerializer(many=True, read_only=True)
    
    class Meta(ServiceSerializer.Meta):
        fields = ServiceSerializer.Meta.fields + ['requirements', 'fees', 'reviews']
