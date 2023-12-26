from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


""" 
Custom manager : will help to authenticate with the help of email
"""
class UserManager(BaseUserManager):
    """ 
    This manager defines how to create and manage user objects. 
    We extend BaseUser Manager to create custom user manager for our user
    """

    def create_user(self, email, password=None, **extra_fields):
        user = self.model(email=self.normalize_email(email), **extra_fields)
        if not email:
            raise ValueError('User must have an email')
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user



""" 
Custom user model, (extra fields can be added) 
"""
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    """ User manager for managing the models """
    objects = UserManager()

    """ Unique identifier """
    USERNAME_FIELD = 'email'


