const db = require('../db/queries');

exports.getItemById = (req, res) => {
    const id = parseInt(req.params.id);
    db.getItemById(id)
        .then(item => {
            if (item) {
                res.render('item', { item });
            } else {
                res.status(404).json({ error: 'Item not found' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve item' });
        });
}

exports.getItemForm = (req, res) => {
    db.getAllCategories()
        .then(categories => {
            res.render('itemForm', { item: null, categories });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve categories' });
        });
}

exports.createItem = (req, res) => {
    const { name, description, price, stock_quantity, category_id } = req.body;
    db.createItem(name, description, price, stock_quantity, category_id)
        .then(item => {
            res.redirect(`/item/${item.id}`);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to create item' });
        });
}

exports.updateItem = (req, res) => {
    const id = parseInt(req.params.id);
    if (req.body.password === process.env.ADMIN_PASSWORD) {
    const { name, description, price, stock_quantity, category_id } = req.body;
    db.updateItem(id, name, description, price, stock_quantity, category_id)
        .then(item => {
            res.redirect(`/item/${item.id}`);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to update item' });
        });
} else {
    res.status(403).json({ error: 'Unauthorized' });
}
}

exports.deleteItem = (req, res) => {
    const id = parseInt(req.params.id);
    if (req.body.password === process.env.ADMIN_PASSWORD) {
    db.deleteItem(id)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete item' });
        });
} else {
    res.status(403).json({ error: 'Unauthorized' });
}
}

exports.getEditItemForm = (req, res) => {
    const id = parseInt(req.params.id);
    Promise.all([
    db.getItemById(id),
    db.getAllCategories()
    ])
        .then(([item, categories]) => {
            if (item) {
                res.render('itemForm', { item, categories });
            } else {
                res.status(404).json({ error: 'Item not found' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve item or categories' });
        });
}