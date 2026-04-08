from django.core.mail import send_mail
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from App.models import UserRegister, AdminUser, Student, Enrollment
from App.serializers import UserRegisterSerializer, StudentSerializer, EnrollmentSerializer
from google.oauth2 import id_token
from google.auth.transport import requests
import os
import random
@api_view(['POST'])
def register_user(request):
    data = request.data

    # check email exists
    if UserRegister.objects.filter(email=data.get('email')).exists():
        return Response({"error": "Email already exists"}, status=400)

    serializer = UserRegisterSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response({
            "message": "User registered successfully",
            "data": serializer.data
        }, status=201)

    return Response(serializer.errors, status=400)


# @api_view(['POST'])
# def login_user(request):
#     email = request.data.get('email')
#     password = request.data.get('password')
   
#     admin = AdminUser.objects.filter(email=email).first()
#     if admin:
#         if password == admin.password:  
#             return Response({
#                 "message": "Admin Login successful",
#             }, status=200)
#         else:
#             return Response({"error": "Invalid password"}, status=401)
        
#     user = UserRegister.objects.filter(email=email).first()
#     if user:
#         if password == user.password:  
#             return Response({
#                 "message": "User Login successful",
#                 "type": "user",
#                 "data": {
#                     "full_name": user.full_name,
#                     "email": user.email,
#                     "phone": user.phone
#                 }
#             }, status=200)
#         else:
#             return Response({"error": "Invalid password"}, status=401)
        
#     return Response({"error": "User not found"}, status=404)


@api_view(['POST'])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
 
    # 🔹 1. Check Admin
    admin = AdminUser.objects.filter(email=email).first()
    if admin:
        if password == admin.password:
            return Response({
                "message": "Admin Login successful",
                "type": "admin",
                "data": {
                    "email": admin.email
                }
            }, status=200)
        else:
            return Response({"error": "Invalid password"}, status=401)
 
    # 🔹 2. Check Normal User
    user = UserRegister.objects.filter(email=email).first()
    if user:
        if password == user.password:
            return Response({
                "message": "User Login successful",
                "type": "user",
                "data": {
                    "full_name": user.full_name,
                    "email": user.email,
                    "phone": user.phone
                }
            }, status=200)
        else:
            return Response({"error": "Invalid password"}, status=401)
 
    # 🔹 3. Check Student
    student = Student.objects.filter(email=email).first()
    if student:
        if password == student.password:
            return Response({
                "message": "Student Login successful",
                "type": "student",
                "data": {
                    "id": student.id,   # ✅ IMPORTANT (you wanted user id)
                    "name": student.name,
                    "email": student.email,
                    "college": student.collegeName,
                    "branch": student.branch,
                    "degree": student.degreeType,
                    "status": student.paymentStatus
                }
            }, status=200)
        else:
            return Response({"error": "Invalid password"}, status=401)
 
    return Response({"error": "User not found"}, status=404)



@api_view(['POST'])
def register_student(request):
    serializer = StudentSerializer(data=request.data)
   
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
   
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
 
@api_view(['POST'])
def create_enrollment(request):
    data = request.data.copy()
 
    print("📥 INCOMING DATA:", data)
 
    email = data.get("email")  # expecting email in request
    if not email:
        return Response({"error": "Email is required to associate a user"}, status=400)
 
    try:
        user = UserRegister.objects.get(email=email)
    except UserRegister.DoesNotExist:
        return Response({"error": "User with this email does not exist"}, status=404)
 
    items = data.get("items", [])
    if not items or not isinstance(items, list):
        return Response({"error": "No items provided"}, status=400)
 
    # keep items as it is
    data['items'] = items
 
    # combine all titles into one column
    titles = [item.get("title", "") for item in items if item.get("title")]
    data['title'] = " | ".join(titles) if titles else "Untitled Course"
 
    # map amount_paid
    data['amount_paid'] = data.get('amount', 0)
    data.pop("amount", None)
 
    # remove email from data since we already resolved user
    data.pop("email", None)
 
    # serialize
    serializer = EnrollmentSerializer(data=data)
    if not serializer.is_valid():
        print("❌ ERRORS:", serializer.errors)
        return Response(serializer.errors, status=400)
 
    # save enrollment with user assigned
    enrollment = serializer.save(user=user)
 
    print("✅ SAVED (single row):", enrollment.id)
 
    return Response({
        "message": "Enrollment created ✅",
        "data": EnrollmentSerializer(enrollment).data
    }, status=201)
 
@api_view(['GET'])
def get_students(request):
    students = Student.objects.all().order_by('-id')  # latest first
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)



GOOGLE_CLIENT_ID = settings.GOOGLE_CLIENT_ID
@api_view(['POST'])
def google_login(request):
    token = request.data.get("access_token")
 
    try:
        idinfo = id_token.verify_oauth2_token(
            token, requests.Request(), GOOGLE_CLIENT_ID
        )
 
        email = idinfo.get('email')
        name = idinfo.get('name', '')
 
        # 🔥 ONLY use UserRegister
        user = UserRegister.objects.filter(email=email).first()
 
        if user:
            return Response({
                "message": "Login successful",
                "data": {
                    "full_name": user.full_name,
                    "email": user.email,
                    "phone": user.phone
                }
            })
 
        # 🔥 create user in SAME TABLE
        user = UserRegister.objects.create(
            full_name=name,
            email=email,
            phone="",
            password=""  # Google users no password
        )
 
        return Response({
            "message": "Google account created",
            "data": {
                "full_name": user.full_name,
                "email": user.email,
                "phone": user.phone
            }
        })
 
    except Exception as e:
        return Response({"error": str(e)}, status=400)
    


@api_view(['GET'])
def get_enrollments(request):
    """
    Retrieve all enrollments from the database
    """
    # enrollments = Enrollment.objects.all()
    enrollments = Enrollment.objects.select_related('user').all()  # get all rows
    serializer = EnrollmentSerializer(enrollments, many=True)
    return Response({
        "message": "Enrollments retrieved ✅",
        "data": serializer.data
    })


@api_view(['POST'])
def forgot_password(request):
    """
    Handle password reset steps:
    - action='request': Check email existence
    - action='reset': Update password for a valid email
    """
    email = request.data.get('email')
    action = request.data.get('action') # 'request' or 'reset'
    new_password = request.data.get('new_password')

    if not email:
        return Response({"error": "Email is required"}, status=400)

    # Find the user record
    user_record = None
    user_type = None

    # Order of check: Admin -> User -> Student
    admin = AdminUser.objects.filter(email=email).first()
    if admin:
        user_record = admin
        user_type = 'admin'
    
    if not user_record:
        user = UserRegister.objects.filter(email=email).first()
        if user:
            user_record = user
            user_type = 'user'
    
    if not user_record:
        student = Student.objects.filter(email=email).first()
        if student:
            user_record = student
            user_type = 'student'

    if not user_record:
        return Response({"error": "Email is wrong"}, status=404)

    if action == 'request':
        # Simulated OTP generation
        otp = str(random.randint(100000, 999999))
        
        try:
            send_mail(
                subject="Your Password Reset OTP",
                message=f"Your OTP for password reset is: {otp}\n\nPlease enter this on the website to proceed.",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                fail_silently=False,
            )
            return Response({
                "message": f"Account verified. OTP sent to your email.",
                "otp": otp, # Still returning for now, but real email was triggered
                "user_type": user_type
            }, status=200)
        except Exception as e:
            return Response({"error": f"Failed to send email: {str(e)}"}, status=500)

    elif action == 'reset':
        if not new_password:
            return Response({"error": "New password is required"}, status=400)
        
        user_record.password = new_password
        user_record.save()
        return Response({"message": "Password updated successfully ✅"}, status=200)

    return Response({"error": "Invalid action"}, status=400)

