import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// ===== BUSCAR TODAS AS CATEGORIAS =====
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
};

// ===== CRIAR UMA CATEGORIA =====
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, color } = req.body;

    const category = await prisma.category.create({
      data: { name, color },
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar categoria' });
  }
};

// ===== DELETAR UMA CATEGORIA =====
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string }

    await prisma.category.delete({ where: { id } });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar categoria' });
  }
};