const db = require('../db/queries');

exports.getAllCategories= (req, res) => {
    db.getAllCategories()
        .then(categories => {
            res.render('index', { categories });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve categories' });
        });
}

exports.getCategoryById = (req, res) => {
    const id = parseInt(req.params.id);
        Promise.all([
        db.getCategoryById(id),
        db.getAllItemsByCategoryId(id)
    ])
        .then(([category, items]) => {
            if (category) {
        res.render('category', { category, items });
    } else {
        res.status(404).json({ error: 'Category not found' });
    }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve category' });
        });
}

exports.createCategory = (req, res) => {
    const { name, description } = req.body;
    db.createCategory(name, description)
        .then(category => {
            res.redirect('/');
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to create category' });
        });
}

exports.deleteCategory = (req, res) => {
    const id = parseInt(req.params.id);
        if (req.body.password === process.env.ADMIN_PASSWORD) {
    db.deleteCategory(id)
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete category' });
        });
} else {
    res.status(403).json({ error: 'Unauthorized' });
}
}

exports.updateCategory = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description } = req.body;
    if (req.body.password === process.env.ADMIN_PASSWORD) {
    db.updateCategory(id, name, description)
        .then(category => {
            res.redirect(`/category/${id}`);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to update category' });
        });
    } else {
        res.status(403).json({ error: 'Unauthorized' });
    }
}

exports.getCategoryForm = (req, res) => {
    res.render('categoryForm', { category: null });
}

exports.getEditCategoryForm = (req, res) => {
    const id = parseInt(req.params.id);
    db.getCategoryById(id)
        .then(category => {
            if (category) {
                res.render('categoryForm', { category });
            } else {
                res.status(404).json({ error: 'Category not found' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve category' });
        });
}

