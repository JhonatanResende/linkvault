from rest_framework import serializers
from .models import Category, Tag, Link


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'color', 'created_at']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class LinkSerializer(serializers.ModelSerializer):
    # Inclui os dados completos da categoria e das tags
    category = CategorySerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    # Campos apenas para escrita (receber do frontend)
    category_id = serializers.UUIDField(write_only=True)
    tag_names = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False,
        default=[]
    )

    class Meta:
        model = Link
        fields = [
            'id', 'title', 'url', 'description',
            'is_favorite', 'created_at', 'updated_at',
            'category', 'category_id',
            'tags', 'tag_names'
        ]

    def create(self, validated_data):
        # Remove os campos customizados antes de criar
        tag_names = validated_data.pop('tag_names', [])
        category_id = validated_data.pop('category_id')

        # Busca a categoria
        category = Category.objects.get(id=category_id)

        # Cria o link
        link = Link.objects.create(category=category, **validated_data)

        # Cria ou busca as tags e associa ao link
        for name in tag_names:
            tag, _ = Tag.objects.get_or_create(name=name.lower())
            link.tags.add(tag)

        return link

    def update(self, instance, validated_data):
        tag_names = validated_data.pop('tag_names', None)
        category_id = validated_data.pop('category_id', None)

        # Atualiza a categoria se foi enviada
        if category_id:
            instance.category = Category.objects.get(id=category_id)

        # Atualiza os campos normais
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        # Atualiza as tags se foram enviadas
        if tag_names is not None:
            instance.tags.clear()
            for name in tag_names:
                tag, _ = Tag.objects.get_or_create(name=name.lower())
                instance.tags.add(tag)

        return instance