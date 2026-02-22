const pool = require('./pool');

async function getAllCategories() {
    const { rows } = await pool.query('SELECT * FROM categories');
    return rows;
}

async function getCategoryById(id) {
    const { rows } = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    return rows[0];
}

async function createCategory(name, description) {
    const { rows } = await pool.query(
        'INSERT INTO categories(name, description) VALUES($1, $2) RETURNING *',
        [name, description]
    );
    return rows[0];
}
async function deleteCategory(id) {
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);
}

async function updateCategory(id, name, description) {
    const { rows } = await pool.query(
        'UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *',
        [name, description, id]
    );
    return rows[0];
}

async function getAllItemsByCategoryId(id) {
    const { rows } = await pool.query('SELECT * FROM items WHERE category_id = $1', [id]);
    return rows;
}

async function getItemById(id) {
    const { rows } = await pool.query('SELECT items.*, categories.name AS category_name FROM items JOIN categories ON items.category_id = categories.id WHERE items.id = $1', 
                                        [id]
                                        );
                                        return rows[0];
                                        }

async function createItem(name, description, price, stock_quantity, category_id) {
    const { rows } = await pool.query(
        'INSERT INTO items(name, description, price, stock_quantity, category_id) VALUES($1, $2, $3, $4, $5) RETURNING *',
        [name, description, price, stock_quantity, category_id]
    );
    return rows[0];
}

async function updateItem(id, name, description, price, stock_quantity, category_id) {
    const { rows } = await pool.query(
        'UPDATE items SET name = $1, description = $2, price = $3, stock_quantity = $4, category_id = $5 WHERE id = $6 RETURNING *',
        [name, description, price, stock_quantity, category_id, id]
    );
    return rows[0];
}

async function deleteItem(id) {
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    deleteCategory,
    updateCategory,
    getAllItemsByCategoryId,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
};