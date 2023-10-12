from rest_framework import serializers
from .models import Creator, Platform, Demographic, Partner, Contract, CreatorPlatform, CreatorDemographic

class CreatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Creator
        fields = '__all__'

class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = '__all__'

class DemographicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demographic
        fields = '__all__'

class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = '__all__'

class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = '__all__'

class CreatorPlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreatorPlatform
        fields = '__all__'

class CreatorDemographicSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreatorDemographic
        fields = '__all__'
