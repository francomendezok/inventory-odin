import pool from './pool.mjs';
import filterProducts from '../filters/filterProducts.mjs';
import { config } from 'dotenv';

config();

async function callFilter () {
    return await filterProducts();
}

async function populateProducts () {
    const products = await callFilter();
    
    try {
        if (pool._connected !== true) {
            await pool.connect();
            console.log('Conexión exitosa a PostgreSQL');
        }

        // Delete before and just once
        await pool.query('DELETE FROM products;');
        console.log('Productos eliminados de la tabla');

        for (let i = 0; i < products.length; i++) {
            const SQL = `
                INSERT INTO products (name, categorieID, sizeID, colorID, price) 
                VALUES (
                    $1, 
                    (SELECT id FROM categories WHERE categorie = $2), 
                    (SELECT id FROM sizes WHERE size = $3), 
                    (SELECT id FROM colors WHERE color = $4), 
                    $5
                );
            `;
            
            const values = [
                products[i].name,
                products[i].categorie,
                products[i].size,
                products[i].color,
                products[i].price
            ];

            await pool.query(SQL, values);
        }
    } catch (err) {
        console.error('Error ejecutando la consulta:', err.stack);
    } finally {
        console.log('Conexión cerrada');
        await pool.end();  // Cerrar la conexión al final del proceso
    }
}


populateProducts();



