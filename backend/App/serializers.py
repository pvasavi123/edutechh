from rest_framework import serializers
from App.models import UserRegister, AdminUser, Student, Enrollment, LiveClass, RecordedClass, Resource

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



class LiveClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = LiveClass
        fields = '__all__'
 
 
class RecordedClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecordedClass
        fields = '__all__'
 
 
class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = '__all__'
 
