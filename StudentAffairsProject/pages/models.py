from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=255, null=True)
    id = models.CharField(max_length=20, primary_key=True)
    mobile = models.CharField(max_length=15, default="0123", null=True)
    email = models.EmailField(default="kareem@gmail.com", null=True)
    date_of_birth = models.DateField(null=True)
    level = models.CharField(max_length=1, null=True)
    gpa = models.DecimalField(max_digits=3, decimal_places=2, default=4, null=True)
    department = models.CharField(max_length=100, default="CS", null=True)
    active_status = models.BooleanField(default=True, null=True)
    gender = models.CharField(max_length=10, default=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.id} - {self.email} "
