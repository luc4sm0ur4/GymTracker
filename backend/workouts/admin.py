from django.contrib import admin
from .models import Exercise, WorkoutRoutine, RoutineExercise, WorkoutSession, ExerciseLog

admin.site.register(Exercise)
admin.site.register(WorkoutRoutine)
admin.site.register(RoutineExercise)
admin.site.register(WorkoutSession)
admin.site.register(ExerciseLog)