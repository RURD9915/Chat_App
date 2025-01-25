from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from .forms import UserRegistrationForm, UserLoginForm
from .models import Message
from django.db.models import Q  # Import Q

def home(request):
    return render(request, 'chat/base_generic.html')

def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserRegistrationForm()
    return render(request, 'chat/register.html', {'form': form})

def user_login(request):
    if request.method == 'POST':
        form = UserLoginForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('chat')
    else:
        form = UserLoginForm()
    return render(request, 'chat/login.html', {'form': form})

def user_logout(request):
    logout(request)
    return redirect('login')

@login_required
def chat(request):
    users = User.objects.exclude(username=request.user.username)  # Exclude the logged-in user
    return render(request, 'chat/chat.html', {'users': users})

@login_required
def chat_with_user(request, username):
    recipient = User.objects.get(username=username)
    users = User.objects.exclude(username=request.user.username)  # Pass the users to the template
    messages = Message.objects.filter(
        Q(sender=request.user, recipient=recipient) | 
        Q(sender=recipient, recipient=request.user)
    ).order_by('timestamp')
    return render(request, 'chat/chat_with_user.html', {'recipient': recipient, 'messages': messages, 'users': users})
