const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const categoryRouter = Router();

categoryRouter.get('/', categoryController.getAllCategories);
categoryRouter.get('/new', categoryController.getCategoryForm);
categoryRouter.get('/:id', categoryController.getCategoryById);
categoryRouter.post('/', categoryController.createCategory);
categoryRouter.delete('/:id', categoryController.deleteCategory);
categoryRouter.get('/:id/edit', categoryController.getEditCategoryForm);
categoryRouter.put('/:id', categoryController.updateCategory);

module.exports = categoryRouter;