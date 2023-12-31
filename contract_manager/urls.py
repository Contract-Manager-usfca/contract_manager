"""
URL configuration for contract_manager project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from contract_manager_application.views import CreatorViewSet, PlatformViewSet, DemographicViewSet, PartnerViewSet, ContractViewSet, CreatorPlatformViewSet, CreatorDemographicViewSet


router = DefaultRouter()
router.register(r'creators', CreatorViewSet)
router.register(r'platforms', PlatformViewSet)
router.register(r'demographics', DemographicViewSet)
router.register(r'partners', PartnerViewSet)
router.register(r'contracts', ContractViewSet)
router.register(r'creator-platforms', CreatorPlatformViewSet)
router.register(r'creator-demographics', CreatorDemographicViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    #re_path(r'^\.well-known/', include('letsencrypt.urls')), ##commented out for testing purposes .... do we even need this????
]
