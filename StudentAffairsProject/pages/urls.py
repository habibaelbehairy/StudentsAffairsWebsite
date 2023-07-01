from django.urls import path
from . import views

urlpatterns = [

    path('about/', views.about, name='about'),
    
    path('Home/', views.home, name='Home'),

    path('UpdateAndDelete/<int:id>/', views.updateDel, name='UpdateAndDelete'),
    path('studentinfo/<int:myid>/', views.testing, name='studentinfo'),
    path('update/', views.update_student, name='update'),
    
    path('AssignDep/<int:id>/', views.assignDB, name='AssignDep'),
    path('depinfo/<int:myid>/', views.updateDep_getData, name='depinfo'),
    path('updatedep/', views.updatedep_student, name='updatedep'),
    path('deletestudent/<int:id>/', views.delete_student, name='deletestudent'),
    
    path('studentStatusPage/', views.studentStatusPage, name='studentStatusPage'),
    path('getStuds/', views.getStuds, name='getStuds'),
    path('updateStatus/', views.updateStatus, name='updateStatus'),

    path('StudentDataBase/', views.studDB, name='StudentDataBase'),
    
    path('AddNewStudent/', views.addNewStudent, name='AddNewStudent'),
   
]
