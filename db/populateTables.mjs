// populates sizes, genders, colors, categories // 

import pool from './pool.mjs'
import filter from '../filters/filterJSON.mjs'
import { config } from 'dotenv'

config()

async function callFilter () {
    const { finalColors, finalCategories } = await filter()
    return {finalColors, finalCategories}
}

const colors_categories = await callFilter()

const colorValues = colors_categories.finalColors
    .map(color => `('${color}')`) 
    .join(", "); 

const categorieValues = colors_categories.finalColors
    .map(cat => `('${cat}')`) 
    .join(", "); 

    const SQL = `
        DELETE FROM sizes;
        DELETE FROM categories;
        DELETE FROM colors;
        DELETE FROM genders;

        INSERT INTO sizes (size) VALUES 
        ('XS'),
        ('S'),
        ('M'),
        ('L'),
        ('XL'),
        ('XXL');

        INSERT INTO genders (gender) VALUES 
        ('male'),
        ('female');

        INSERT INTO colors (color) VALUES 
        ${colorValues};

        INSERT INTO categories (categorie) VALUES 
        ${categorieValues}; 
        `;



        async function main() {
        try {
            // Conectar al cliente solo si no está conectado
            if (pool._connected !== true) {
                await pool.connect();
                console.log('Conexión exitosa a PostgreSQL');
            }
    
            // Ejecutar la consulta SQL
            await pool.query(SQL);
            console.log('Tabla creada y datos insertados con éxito');
        } catch (err) {
            console.error('Error ejecutando la consulta:', err.stack);
        } finally {
            // Mantener la conexión abierta para futuras consultas
            // No cierres la conexión si planeas seguir usando el cliente
            console.log('Operación completada');
        }
    }
    
    main();