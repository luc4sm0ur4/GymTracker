from rest_framework import viewsets
from .models import Exercise, WorkoutRoutine
from .serializers import ExerciseSerializer, WorkoutRoutineSerializer

class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

class WorkoutRoutineViewSet(viewsets.ModelViewSet):
    queryset = WorkoutRoutine.objects.all()
    serializer_class = WorkoutRoutineSerializer