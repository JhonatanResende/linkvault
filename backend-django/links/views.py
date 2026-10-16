from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Category, Tag, Link
from .serializers import CategorySerializer, LinkSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    # Sobrescreve o delete pra retornar 204
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class LinkViewSet(viewsets.ModelViewSet):
    queryset = Link.objects.all().prefetch_related('tags', 'category')
    serializer_class = LinkSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)