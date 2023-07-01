from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.views.decorators.csrf import csrf_exempt

from .models import Student
from django.contrib import messages


def get_student_data(request):
    students = Student.objects.all()  # Assuming User Student represents students
    data = []
    for student in students:
        data.append({
            'name': student.username,
            'id': student.id,
            'status': student.is_active
        })
    return JsonResponse(data, safe=False)


def addNewStudent(request):
    myname = request.POST.get('name')
    myid = request.POST.get('id')
    mymobile = request.POST.get('mobile')
    myemail = request.POST.get('email')
    mydate_of_birth = request.POST.get('date_of_birth')
    mylevel = request.POST.get('choice1')
    mygpa = request.POST.get('GPA')
    mydepartment = request.POST.get('choice')
    if request.POST.get('ActivationStutes') == "Active":
        myactive_status = True
    else:
        myactive_status = False
    mygender = request.POST.get('Gender')
    data = Student(name=myname, id=myid, mobile=mymobile, email=myemail, date_of_birth=mydate_of_birth, level=mylevel,
                   gpa=mygpa, department=mydepartment, active_status=myactive_status, gender=mygender)

    if Student.objects.filter(id=myid).exists():
        return render(request, 'pages/AddNewStudent.html', {'exist': True})
        # messages.info(request, 'The ID exists.')
    else:
        # x = object.
        data.save()
        return render(request, 'pages/AddNewStudent.html', {'exist': False})
    # return render(request, 'pages/StudentDataBase.html')


def about(request):
    return render(request, 'pages/about.html')


def welcome(request):
    return render(request, 'pages/welcome.html')


def home(request):
    return render(request, 'pages/Home.html')


def studDB(request):
    return render(request, 'pages/StudentDataBase.html', {'DataBase': Student.objects.all()})


def studStatus(request):
    students = Student.objects.all()
    student_data = []
    for student in students:
        student_data.append({
            'name': student.name,
            'ID': student.id,
            'status': student.active_status,
        })
    return JsonResponse(student_data, safe=False)


# ======================================================================================================================================

def update_student(request):
    student_id = request.POST.get('ID')
    student = Student.objects.get(id=student_id)
    student.name = request.POST.get('name')
    student.mobile = request.POST.get('mobile')
    student.email = request.POST.get('email')
    student.date_of_birth = request.POST.get('date_of_birth')
    student.level = request.POST.get('level')
    student.gpa = request.POST.get('gpa')
    student.department = request.POST.get('department')
    if request.POST.get('status') == "true":
        student.active_status = True
    else:
        student.active_status = False
    student.gender = request.POST.get('gender')

    student.save()

    return JsonResponse({'success': True})


def testing(request, myid):
    get_student = Student.objects.get(id=myid)
    data = {
        'name': get_student.name,
        'ID': get_student.id,
        'status': get_student.active_status,
        'mobile': get_student.mobile,
        'email': get_student.email,
        'date_of_birth': get_student.date_of_birth,
        'level': get_student.level,
        'gpa': get_student.gpa,
        'department': get_student.department,
        'gender': get_student.gender,
    }

    return JsonResponse(data)


def updateDel(request, id):
    return render(request, 'pages/UpdateAndDelete.html')


# ======================================================================================================================================

def updatedep_student(request):
    if request.method == 'POST':
        student_id = request.POST.get('ID')
        student_dep = request.POST.get('department')

        student = Student.objects.get(id=student_id)
        student.department = student_dep
        student.save()

        return JsonResponse({'success': True})
    else:
        return JsonResponse({'success': False})


def updateDep_getData(request, myid):
    get_student = Student.objects.get(id=myid)
    data = {
        'name': get_student.name,
        'ID': get_student.id,
        'level': get_student.level,
        'department': get_student.department,
    }
    return JsonResponse(data)


def assignDB(request, id):
    return render(request, 'pages/AssignDep.html')


def delete_student(request, id):
    stud = get_object_or_404(Student, id=id)
    stud.delete()
    print("deleted")
    return JsonResponse({'redirect': '/pages/StudentDataBase/'})


# ==================student status page ========================================
def studentStatusPage(request):
    return render(request, 'pages/studentStatusPage.html')


def getStuds(request):
    students = Student.objects.all()  # Assuming User Student represents students
    data = []
    for student in students:
        data.append({
            'name': student.name,
            'id': student.id,
            'status': student.active_status
        })
    return JsonResponse(data, safe=False)


@csrf_exempt
def updateStatus(request):
    if request.method == 'POST':
        id = request.POST.get('id')
        status = request.POST.get('status')
        students = Student.objects.all()

        for stud in students:
            if stud.id == id:
                stud.active_status = (status == 'true')
                stud.save()
        response_data = {
            'message': 'Data received successfully',
            'id': id,
            'status': status,
        }
        return JsonResponse(response_data)
