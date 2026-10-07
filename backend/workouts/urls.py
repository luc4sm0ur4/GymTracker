from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExerciseViewSet, WorkoutRoutineViewSet

router = DefaultRouter()
router.register(r'exercises', ExerciseViewSet)
router.register(r'routines', WorkoutRoutineViewSet)

urlpatterns = [
    path('', include(router.urls)),
]