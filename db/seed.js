require('dotenv').config();
const {Client} = require('pg');

// This script seeds the database with initial data for categories and items. It connects to the PostgreSQL database using the connection string from the .env file, inserts sample categories and items, and then closes the connection. You can run this script with `node db/seed.js` to populate your database with initial data for testing and development purposes.
async function main() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });
    try{
        // Connect to the database and insert seed data
    await client.connect();

    const basketball = await client.query(
    `INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *`,
    ['Basketball', 'All basketball related items']
    );
    // Get the ID of the newly inserted basketball category to use as a foreign key for the items
    const basketballId = basketball.rows[0].id;
    
    const soccer = await client.query(`
    INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *;`, 
    ['Soccer', 'All soccer related items']);

    const soccerId = soccer.rows[0].id;

    const tennis = await client.query(`
        INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *;
    `, ['Tennis', 'All tennis related items']);

    const tennisId = tennis.rows[0].id;

    await client.query(`
        INSERT INTO items (name, description, price, stock_quantity, category_id) VALUES ($1, $2, $3, $4, $5);
    `, ['Basketball', 'Official size and weight basketball', 29.99, 100, basketballId]);
    
    await client.query(`
        INSERT INTO items (name, description, price, stock_quantity, category_id) VALUES ($1, $2, $3, $4, $5);
    `, ['Basketball Shoes', 'High-performance basketball shoes for optimal support and traction', 129.99, 50, basketballId]);

    await client.query(`
        INSERT INTO items (name, description, price, stock_quantity, category_id) VALUES ($1, $2, $3, $4, $5);
    `, ['Basketball Hoop', 'Adjustable basketball hoop for indoor and outdoor use', 199.99, 20, basketballId]);

    await client.query(`
        INSERT INTO items (name, description, price, stock_quantity, category_id) VALUES ($1, $2, $3, $4, $5);
    `, ['Soccer Cleats', 'High-performance soccer cleats for optimal traction', 79.99, 75, soccerId]);

    await client.query(`
        INSERT INTO items (name, description, price, stock_quantity, category_id) VALUES ($1, $2, $3, $4, $5);
    `, ['Soccer Jersey', 'Official team soccer jersey made from breathable fabric', 49.99, 120, soccerId]);

    await client.query(`
        INSERT INTO items (name, description, price, stock_quantity, category_id) VALUES ($1, $2, $3, $4, $5);
    `, ['Soccer Ball', 'Standard size 5 soccer ball', 19.99, 150, soccerId]);

    await client.query(`
        INSERT INTO items (name, description, price, stock_quantity, category_id) VALUES ($1, $2, $3, $4, $5);
    `, ['Tennis Balls', 'Pack of 3 high-quality tennis balls', 9.99, 200, tennisId]);
    
    await client.query(`
        INSERT INTO items (name, description, price, stock_quantity, category_id) VALUES ($1, $2, $3, $4, $5);
    `, ['Tennis Shoes', 'Lightweight tennis shoes for optimal performance on the court', 89.99, 60, tennisId]);

    await client.query(`
        INSERT INTO items (name, description, price, stock_quantity, category_id) VALUES ($1, $2, $3, $4, $5);
    `, ['Tennis Racket', 'Lightweight tennis racket for all skill levels', 89.99, 50, tennisId]);

    console.log('Database seeded successfully!');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
    await client.end();
}
}

main();