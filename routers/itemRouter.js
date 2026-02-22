const { Router } = require('express');
const itemController = require('../controllers/itemController');
const itemRouter = Router();

itemRouter.get('/new', itemController.getItemForm);
itemRouter.get('/:id',itemController.getItemById);
itemRouter.post('/', itemController.createItem);
itemRouter.get('/:id/edit', itemController.getEditItemForm);
itemRouter.put('/:id', itemController.updateItem);
itemRouter.delete('/:id', itemController.deleteItem);

module.exports = itemRouter;

