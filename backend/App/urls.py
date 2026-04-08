from django.contrib import admin
from django.urls import path,include
from App import views


urlpatterns = [
   path('register/', views.register_user),
   path('verify/', views.login_user),
   path('register_student/', views.register_student),
   
   path('students/', views.get_students),
   path('enroll/', views.create_enrollment),
   path('auth/google/', views.google_login),
   path('enrollments/', views.get_enrollments, name='get_enrollments'), 
   path('forgot-password/', views.forgot_password),
]
