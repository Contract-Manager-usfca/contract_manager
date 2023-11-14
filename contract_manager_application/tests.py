from django.test import TestCase
from contract_manager_application.models import Creator 

# Create your tests here.
class CreatorTestCase(TestCase):
    def setUp(self):
        Creator.objects.create(name="John", username="JohnDoe", password= "JohnDoePW")
        Creator.objects.create(name="Mary", username="MaryJane", password= "MaryJanePW")

    def test_creator_password(self):
        """Creator passwords are correctly identified"""
        john = Creator.objects.get(name="John")
        self.assertEqual(john.password, "JohnDoePW")
