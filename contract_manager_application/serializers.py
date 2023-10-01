from rest_framework import serializers
from .models import Creator, Platform, Demographic, Partner, Contract, CreatorPlatform, CreatorDemographic

class CreatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Creator
        fields = '__all__'

# Follow the same structure for other models
