from rest_framework import serializers
from App.models import UserRegister, AdminUser, Student, Enrollment

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRegister
        fields = '__all__'

class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        fields = ['name', 'email', 'password']


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
 

class EnrollmentSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField(source='user.full_name')

    class Meta:
        model = Enrollment
        fields = "__all__"
        read_only_fields = [
            'user',
            'remaining_amount',
            'payment_status',
            'total_fee',
        ]
 
