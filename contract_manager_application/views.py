from django.shortcuts import render
from rest_framework import viewsets
from .models import Creator, Platform, Demographic, Partner, Contract, CreatorPlatform, CreatorDemographic
from .serializers import CreatorSerializer, PlatformSerializer, DemographicSerializer, PartnerSerializer, ContractSerializer, CreatorPlatformSerializer, CreatorDemographicSerializer

class CreatorViewSet(viewsets.ModelViewSet):
    queryset = Creator.objects.all()
    serializer_class = CreatorSerializer

class PlatformViewSet(viewsets.ModelViewSet):
    queryset = Platform.objects.all()
    serializer_class = PlatformSerializer

class DemographicViewSet(viewsets.ModelViewSet):
    queryset = Demographic.objects.all()
    serializer_class = DemographicSerializer

class PartnerViewSet(viewsets.ModelViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer

class ContractViewSet(viewsets.ModelViewSet):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer

class CreatorPlatformViewSet(viewsets.ModelViewSet):
    queryset = CreatorPlatform.objects.all()
    serializer_class = CreatorPlatformSerializer

class CreatorDemographicViewSet(viewsets.ModelViewSet):
    queryset = CreatorDemographic.objects.all()
    serializer_class = CreatorDemographicSerializer
# Follow the same structure for other models

