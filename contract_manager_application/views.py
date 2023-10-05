from django.shortcuts import render
from rest_framework import viewsets
from .models import Creator, Platform, Demographic, Partner, Contract, CreatorPlatform, CreatorDemographic
from .serializers import CreatorSerializer, PlatformSerializer, DemographicSerializer, PartnerSerializer, ContractSerializer, CreatorPlatformSerializer, CreatorDemographicSerializer



import logging
logger = logging.getLogger(__name__)

class CreatorViewSet(viewsets.ModelViewSet):
    queryset = Creator.objects.all()
    serializer_class = CreatorSerializer

    def list(self, request, *args, **kwargs):
        logger.debug("Fetching all creator objects")
        creators = Creator.objects.all()
        logger.debug(f"Found {creators.count()} creator objects")
        logger.debug(f"Connecting to database: {self.queryset.db}")
        return super().list(request, *args, **kwargs)


# class CreatorViewSet(viewsets.ModelViewSet):
#     queryset = Creator.objects.all()
#     serializer_class = CreatorSerializer

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

