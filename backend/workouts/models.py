from django.db import models
from django.contrib.auth.models import User

class Exercise(models.Model):
    name = models.CharField(max_length=100) # Ex: Supino Reto
    category = models.CharField(max_length=50) # Ex: Máquina, Peso Livre, Cardio

    def __str__(self):
        return self.name

class WorkoutRoutine(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50) # Ex: "Treino A"
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.name} - {self.user.username}"

class RoutineExercise(models.Model):
    routine = models.ForeignKey(WorkoutRoutine, on_delete=models.CASCADE, related_name="exercises")
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    target_sets = models.PositiveIntegerField(default=3)
    target_reps = models.CharField(max_length=20) # Ex: "8-12"
    rest_time_seconds = models.PositiveIntegerField(default=60)
    order = models.PositiveIntegerField()

    class Meta:
        ordering = ['order']

class WorkoutSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    routine = models.ForeignKey(WorkoutRoutine, on_delete=models.SET_NULL, null=True, blank=True)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    cardio_duration_minutes = models.PositiveIntegerField(default=0)

class ExerciseLog(models.Model):
    session = models.ForeignKey(WorkoutSession, on_delete=models.CASCADE, related_name="logs")
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    set_number = models.PositiveIntegerField()
    weight = models.FloatField(default=0.0)
    reps = models.PositiveIntegerField()
    completed = models.BooleanField(default=False)