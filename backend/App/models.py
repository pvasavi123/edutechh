from django.db import models

class UserRegister(models.Model):
    full_name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.email
    

class AdminUser(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.TextField()
     
    def __str__(self):
        return self.email



 
class Student(models.Model):
    ENROLLMENT_CHOICES = [
        ("Course", "Course"),
        ("Internship", "Internship"),
        ("Course+Internship", "Course+Internship"),
    ]
 
    DEGREE_CHOICES = [
        ("B.Tech", "B.Tech"),
        ("B.E", "B.E"),
        ("M.Tech", "M.Tech"),
        ("BCA", "BCA"),
    ]
 
    YEAR_CHOICES = [
        ("2024", "2024"),
        ("2025", "2025"),
        ("2026", "2026"),
        ("2027", "2027"),
    ]
 
    PAYMENT_STATUS_CHOICES = [
        ("Paid", "Paid"),
        ("Pending", "Pending"),
    ]
 
    # 🔹 Basic Info
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    # phone = models.CharField(max_length=15)
    password = models.CharField(max_length=255)
 
    # 🔹 Academic Info
    collegeName = models.CharField(max_length=200, blank=True, null=True)
    branch = models.CharField(max_length=100, blank=True, null=True)
    degreeType = models.CharField(max_length=20, choices=DEGREE_CHOICES, default="B.Tech")
    cgpa = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True)
    passOutYear = models.CharField(max_length=10, choices=YEAR_CHOICES, default="2026")
 
    # 🔹 Course Info
    enrollmentType = models.CharField(max_length=20, choices=ENROLLMENT_CHOICES, default="Course")
    couponCode = models.CharField(max_length=50, blank=True, null=True)
 
    # 🔹 Payment
    paymentStatus = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default="Pending")
 
    # 🔹 Meta
    created_at = models.DateTimeField(auto_now_add=True)
 
    def __str__(self):
        return f"{self.name} ({self.email})"
   
from django.db import models
 
class Enrollment(models.Model):
    ENROLLMENT_CHOICES = [
        ('full', 'Full Payment'),
        ('installment', 'Installment'),
        ('slot', 'Seat Booking'),
    ]
 
    PAYMENT_METHOD_CHOICES = [
        ('upi', 'UPI'),
        ('card', 'Card'),
        ('netbanking', 'Net Banking'),
    ]
 
    PAYMENT_STATUS = [
        ('pending', 'Pending'),
        ('partial', 'Partial'),
        ('completed', 'Completed'),
    ]
 
    # ------------------------
    # USER
    # ------------------------
    user = models.ForeignKey(
    "UserRegister",
    on_delete=models.CASCADE,
    null=True,       # ✅ allow null
    blank=True       # ✅ allow empty
)
 
    # ------------------------
    # COURSE DATA
    # ------------------------
    title = models.CharField(max_length=255, blank=True)
    # titles = models.TextField(blank=True)
    items = models.JSONField()
   
 
    # ------------------------
    # PAYMENT DATA
    # ------------------------
    total_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    remaining_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
 
    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS,
        default='pending'
    )
 
    # ------------------------
    # EXTRA INFO (FROM UI)
    # ------------------------
    enrollment_type = models.CharField(max_length=20, choices=ENROLLMENT_CHOICES)
    batch_date = models.CharField(max_length=50)
 
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    billing_country = models.CharField(max_length=50)
    billing_state = models.CharField(max_length=50)
 
    # ------------------------
    # TIMESTAMP
    # ------------------------
    created_at = models.DateTimeField(auto_now_add=True)
 
    # ------------------------
    # 🔥 AUTO CALCULATION
    # ------------------------
    def calculate_total_fee(self):
        total = 0
        if not isinstance(self.items, list):
            return 0
        for item in self.items:
            price = item.get("price", 0)
            if price is None:
                price = 0
 
            if isinstance(price, str):
                digits = ''.join(filter(str.isdigit, price))
                price = int(digits) if digits else 0
 
            total += price
 
        return total
 
    def save(self, *args, **kwargs):
        # ✅ 1. Calculate total fee from items
        self.total_fee = self.calculate_total_fee()
 
        # ✅ 2. remaining amount
        self.remaining_amount = self.total_fee - self.amount_paid
 
        # ✅ 3. payment status
        if self.amount_paid == 0:
            self.payment_status = "pending"
        elif self.remaining_amount <= 0:
            self.payment_status = "completed"
            self.remaining_amount = 0
        else:
            self.payment_status = "partial"
 
        super().save(*args, **kwargs)
 
    def __str__(self):
        return f"{self.user} - ₹{self.amount_paid}/{self.total_fee} ({self.payment_status})"

 
COURSE_CHOICES = [
    ('All Courses', 'All Courses'),
    ('Java Full Stack', 'Java Full Stack'),
    ('Python Development', 'Python Development'),
    ('MERN Stack', 'MERN Stack'),
    ('SQL & Data Analytics', 'SQL & Data Analytics'),
]
 
BATCH_CHOICES = [
    ('All Batches', 'All Batches'),
    ('June Batch', 'June Batch'),
    ('Sept Batch', 'Sept Batch'),
    ('Dec Batch', 'Dec Batch'),
]
 
 
class LiveClass(models.Model):
    topic = models.CharField(max_length=255)
    link = models.URLField()
    date = models.DateField(null=True, blank=True)
    time = models.TimeField(null=True, blank=True)
    targetCourse = models.CharField(max_length=100, choices=COURSE_CHOICES)
    batchMonth = models.CharField(max_length=100, choices=BATCH_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
 
 
class RecordedClass(models.Model):
    title = models.CharField(max_length=255)
    videoLink = models.URLField()
    duration = models.CharField(max_length=50, blank=True)
    targetCourse = models.CharField(max_length=100, choices=COURSE_CHOICES)
    batchMonth = models.CharField(max_length=100, choices=BATCH_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
 
 
class Resource(models.Model):
    title = models.CharField(max_length=255)
    driveLink = models.URLField()
    description = models.TextField(blank=True)
    targetCourse = models.CharField(max_length=100, choices=COURSE_CHOICES)
    batchMonth = models.CharField(max_length=100, choices=BATCH_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)