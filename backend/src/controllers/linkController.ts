import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// ===== BUSCAR TODOS OS LINKS =====
export const getLinks = async (req: Request, res: Response) => {
  try {
    const links = await prisma.link.findMany({
      include: {
        category: true, // inclui os dados da categoria junto
        tags: true,     // inclui as tags junto
      },
      orderBy: {
        createdAt: 'desc', // mais recentes primeiro
      },
    });

    res.json(links);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar links' });
  }
};

// ===== BUSCAR UM LINK PELO ID =====
export const getLinkById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string }

    const link = await prisma.link.findUnique({
      where: { id },
      include: { category: true, tags: true },
    });

    // Se não encontrar, responde com 404
    if (!link) {
      res.status(404).json({ error: 'Link não encontrado' });
      return;
    }

    res.json(link);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar link' });
  }
};

// ===== CRIAR UM NOVO LINK =====
export const createLink = async (req: Request, res: Response) => {
  try {
    // Pega os dados que vieram no corpo da requisição
    const { title, url, description, categoryId, tags } = req.body;

    const link = await prisma.link.create({
      data: {
        title,
        url,
        description,
        categoryId,
        // conecta ou cria as tags automaticamente
        tags: {
          connectOrCreate: tags?.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })) || [],
        },
      },
      include: { category: true, tags: true },
    });

    // 201 = "Created" (criado com sucesso)
    res.status(201).json(link);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar link' });
  }
};

// ===== EDITAR UM LINK =====
export const updateLink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string }
    const { title, url, description, categoryId, isFavorite, tags } = req.body;

    const link = await prisma.link.update({
      where: { id },
      data: {
        title,
        url,
        description,
        categoryId,
        isFavorite,
        tags: {
          set: [], // remove todas as tags antigas
          connectOrCreate: tags?.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })) || [],
        },
      },
      include: { category: true, tags: true },
    });

    res.json(link);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar link' });
  }
};

// ===== DELETAR UM LINK =====
export const deleteLink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string }

    await prisma.link.delete({
      where: { id },
    });

    // 204 = "No Content" (deletou, não tem nada pra retornar)
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar link' });
  }
};