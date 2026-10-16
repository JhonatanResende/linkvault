from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, LinkViewSet

# O Router cria as rotas automaticamente!
router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'links', LinkViewSet)

urlpatterns = [
    path('', include(router.urls)),
]