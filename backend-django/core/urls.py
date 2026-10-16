from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

# Rota de teste
def health(request):
    return JsonResponse({
        'status': 'ok',
        'message': 'Servidor Django do LinkVault rodando!'
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('health/', health),
    path('', include('links.urls')),
]