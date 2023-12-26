from django.db import models
import uuid
from user import models as userModel
from django.utils import timezone

"""
Channel model, to create project where a manager can add juniors.
"""
class Channel(models.Model):
    id = models.CharField(max_length=10,primary_key=True,editable=False)
    name = models.CharField(max_length=50)
    # admin = models.ForeignKey(userModel.User, on_delete=models.CASCADE)

    def save(self,*args, **kwargs):
        if not self.id:
            self.id = str(uuid.uuid4())[:5]
        super().save(*args, **kwargs)

    @property
    def get_admin(self):
        member = Member.objects.get(channel=self.id,status='admin')
        return str(member.user.name)

    def __str__(self) -> str:
        return str(self.id)

class Member(models.Model):
    PRIVILAGE = (
        ('admin',"Admin"),
        ('participant',"Participant"),
    )
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    user = models.ForeignKey(userModel.User, on_delete=models.CASCADE)
    status = models.CharField(choices=PRIVILAGE, max_length=50)
    
    class Meta:
        # constraint to ensure a user can join a channel only once
        constraints = [
            models.UniqueConstraint(
                fields=['channel', 'user'],
                name='unique_channel_member'
            )
        ]


    def __str__(self) -> str:
        return str(self.channel)


"""
Invitation model, to send invitation to users
"""
class Invitation(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('email_sent', 'Email Sent'),
        ('accepted', 'Accepted'),
    )

    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    invitation_id = models.UUIDField(default=uuid.uuid4,editable=False)
    invited_user_email = models.EmailField(max_length=254)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"{self.channel}"



"""
Task model, to assign tasks to users
"""
class Task(models.Model):
    STATUS_CHOICES = (
        ('completed', 'Completed'),
        ('on_hold', 'On Hold'),
        ('rejected', 'Rejected'),
        ('not_completed', 'Not Completed'),
    )

    id = models.CharField(max_length=10,primary_key=True,editable=False)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    junior = models.ForeignKey(userModel.User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    deadline = models.DateField()
    status = models.CharField(choices=STATUS_CHOICES, max_length=50,default="not_completed")
    createdAt = models.DateField(auto_now_add=False,default=timezone.now())


    def save(self,*args, **kwargs):
        if not self.id:
            self.id = str(uuid.uuid4())[:5]
        super().save(*args, **kwargs)

    @property
    def get_name(self):
        user = userModel.User.objects.get(email=self.junior)
        return str(user.name)


    def __str__(self):
        return str(self.title)
    