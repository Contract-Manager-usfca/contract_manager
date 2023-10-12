from django.db import models

class Creator(models.Model):
    name = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

class Platform(models.Model):
    name = models.CharField(max_length=255)

class Demographic(models.Model):
    demographic = models.CharField(max_length=255)

class Partner(models.Model):
    name = models.CharField(max_length=255)

class Contract(models.Model):
    user = models.ForeignKey(Creator, on_delete=models.CASCADE)
    partner = models.ForeignKey(Partner, on_delete=models.CASCADE)
    amount_paid = models.IntegerField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

class CreatorPlatform(models.Model):
    creator = models.ForeignKey(Creator, on_delete=models.CASCADE)
    platform = models.ForeignKey(Platform, on_delete=models.CASCADE)
    follower_count = models.IntegerField()
    handle = models.CharField(max_length=255)
    last_update = models.DateTimeField()

    class Meta:
        unique_together = ['creator', 'platform']

class CreatorDemographic(models.Model):
    creator = models.ForeignKey(Creator, on_delete=models.CASCADE)
    demographic = models.ForeignKey(Demographic, on_delete=models.CASCADE)
    demo = models.CharField(max_length=255)
    last_update = models.DateTimeField()

    class Meta:
        unique_together = ['creator', 'demographic']
