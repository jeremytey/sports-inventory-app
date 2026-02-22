require('dotenv').config();
const {Client} = require('pg');
const SQL = require('schema.sql');



async function main() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
}

main();