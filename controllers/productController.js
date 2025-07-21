import { getAllProducts } from '../services/dbService.js';

export const getProducts = async (req, res, next) => {
  try {
    const productos = await getAllProducts();
    res.json(productos);
  } catch (error) {
    next(error);
  }
};
