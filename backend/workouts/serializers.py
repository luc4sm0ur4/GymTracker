from rest_framework import serializers
from .models import Exercise, WorkoutRoutine, RoutineExercise

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'

class RoutineExerciseSerializer(serializers.ModelSerializer):
    # Traz os detalhes do exercício junto com as séries e reps
    exercise_details = ExerciseSerializer(source='exercise', read_only=True)
    
    class Meta:
        model = RoutineExercise
        fields = ['id', 'exercise', 'exercise_details', 'target_sets', 'target_reps', 'rest_time_seconds', 'order']

class WorkoutRoutineSerializer(serializers.ModelSerializer):
    # Inclui a lista de exercícios dentro da rotina de treino (A, B, C...)
    exercises = RoutineExerciseSerializer(many=True, read_only=True)

    class Meta:
        model = WorkoutRoutine
        fields = ['id', 'user', 'name', 'description', 'exercises']