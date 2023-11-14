from django.test import TestCase
from datetime import datetime
from contract_manager_application.models import *

# Create your tests here.
class CreatorTestCase(TestCase):
    def setUp(self):
        Creator.objects.create(name="John", username="JohnDoe", password= "JohnDoePW")
        Creator.objects.create(name="Mary", username="MaryJane", password= "MaryJanePW")
        Creator.objects.create(name="Alice", username="Alice123", password="AlicePW")
        Creator.objects.create(name="Bob", username="Bob456", password="BobPW")

    def test_creator_password(self):
        """Creator passwords are correctly identified"""
        john = Creator.objects.get(name="John")
        self.assertEqual(john.password, "JohnDoePW")

    def test_creator_unique_username(self):
        """Test that a Creator's username is unique"""
        with self.assertRaises(Exception):
            Creator.objects.create(name="Alice", username="Alice123", password="AlicePW2")

class PlatformTestCase(TestCase):
    def setUp(self):
        Platform.objects.create(name="YouTube")
        Platform.objects.create(name="Instagram")

    def test_platform_creation(self):
        """Test the creation and attributes of Platform instances"""
        youtube = Platform.objects.get(name="YouTube")
        instagram = Platform.objects.get(name="Instagram")
        self.assertEqual(youtube.name, "YouTube")
        self.assertEqual(instagram.name, "Instagram")

class DemographicTestCase(TestCase):
    def setUp(self):
        Demographic.objects.create(demographic="Teens")
        Demographic.objects.create(demographic="Adults")

    def test_demographic_creation(self):
        """Test the creation and attributes of Demographic instances"""
        teens = Demographic.objects.get(demographic="Teens")
        adults = Demographic.objects.get(demographic="Adults")
        self.assertEqual(teens.demographic, "Teens")
        self.assertEqual(adults.demographic, "Adults")

class PartnerTestCase(TestCase):
    def setUp(self):
        Partner.objects.create(name="Nike")
        Partner.objects.create(name="Adidas")

    def test_partner_creation(self):
        """Test the creation and attributes of Partner instances"""
        nike = Partner.objects.get(name="Nike")
        adidas = Partner.objects.get(name="Adidas")
        self.assertEqual(nike.name, "Nike")
        self.assertEqual(adidas.name, "Adidas")

class ContractTestCase(TestCase):
    def setUp(self):
        creator = Creator.objects.create(name="Charlie", username="Charlie789", password="CharliePW")
        partner = Partner.objects.create(name="Puma")
        Contract.objects.create(user=creator, partner=partner, amount_paid=5000, start_date=datetime.now(), end_date=datetime.now())

    def test_contract_creation(self):
        """Test the creation and attributes of Contract instances"""
        contract = Contract.objects.first()
        self.assertEqual(contract.amount_paid, 5000)
        self.assertEqual(contract.user.name, "Charlie")
        self.assertEqual(contract.partner.name, "Puma")

class CreatorPlatformTestCase(TestCase):
    def setUp(self):
        creator = Creator.objects.create(name="Dave", username="Dave123", password="DavePW")
        platform = Platform.objects.create(name="Twitter")
        CreatorPlatform.objects.create(creator=creator, platform=platform, follower_count=1000, handle="@DaveOnTwitter", last_update=datetime.now())

    def test_creator_platform_creation(self):
        """Test the creation and attributes of CreatorPlatform instances"""
        creator_platform = CreatorPlatform.objects.first()
        self.assertEqual(creator_platform.follower_count, 1000)
        self.assertEqual(creator_platform.handle, "@DaveOnTwitter")
        self.assertEqual(creator_platform.creator.name, "Dave")
        self.assertEqual(creator_platform.platform.name, "Twitter")