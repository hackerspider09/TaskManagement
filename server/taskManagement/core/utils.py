from django.core.mail import send_mail
from django.conf import settings

clientURL = 'http://localhost:3000'

def send_email_util(reciver,sender,invitationId):
    subject= f"{sender} has invited you to Join channel on DevHub"
    message = "hello from django server"

    from_email = settings.EMAIL_HOST_USER

    recipient_list = ["prasadkhatake20@gmail.com"]

    send_mail(subject,message,from_email,recipient_list)


from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

def send_join_invite_email(reciver,sender,invitationId):
    subject = f"{sender} has invited you to Join channel on DevHub"
    from_email = settings.EMAIL_HOST_USER
    to_email = reciver

    # Render HTML content from a template
    html_content = render_to_string('join_invite_email.html', {'join_link': clientURL+f"/invitation/{invitationId}",'from':sender})

    # Create a text version by stripping HTML tags
    text_content = strip_tags(html_content)

    # Create the EmailMultiAlternatives object
    msg = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
    msg.attach_alternative(html_content, "text/html")

    # Send the email
    msg.send()