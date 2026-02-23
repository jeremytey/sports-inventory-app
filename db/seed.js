require('dotenv').config();
const {Client} = require('pg');

async function main() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });
    await client.connect();
    await client.query(`
        INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *;
    `, ['Basketball', 'All basketball related items']);
    await client.query(`
        INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *;
    `, ['Soccer', 'All soccer related items']);
    await client.query(`
        INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *;
    `, ['Tennis', 'All tennis related items']);
    await client.end();
}

main();