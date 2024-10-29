import pool from './pool.mjs';

async function getAllData() {
    try {
        const SQL = `
            SELECT 
                products.id,
                products.name, 
                (SELECT categories.categorie FROM categories WHERE categories.id = products.categorieID) AS categorie,
                (SELECT sizes.size FROM sizes WHERE sizes.id = products.sizeID) AS size,
                (SELECT colors.color FROM colors WHERE colors.id = products.colorID) AS color,
                products.price
            FROM products;
        `;

        const { rows } = await pool.query(SQL);
        return rows
    } catch (error) {
        console.error('Error', error);
        throw error;
    } finally {
        console.log('End conection. Everything is OK');
    }
}

async function getItem(id) {
    try {
        const SQL = `
            SELECT 
            products.id,
            products.name, 
            (SELECT categories.categorie FROM categories WHERE categories.id = products.categorieID) AS categorie,
            (SELECT sizes.size FROM sizes WHERE sizes.id = products.sizeID) AS size,
            (SELECT colors.color FROM colors WHERE colors.id = products.colorID) AS color,
            products.price
            FROM products 
            WHERE products.id = $1`;
        
        const { rows } = await pool.query(SQL, [id]);  // Usar consultas parametrizadas
        const item = rows[0]; // El primer resultado de la consulta
        
        return item
    }
    catch (error) {
        console.log(error.stack)
    }
    finally {
        console.log('query item ended')
    }
}

async function getAllCategories() {
    try {
        const SQL = `
            SELECT * FROM categories;
            `;

        const { rows } = await pool.query(SQL);
        return rows
    }
    catch (error) {
        console.log(error.stack)
    }
    finally {
        console.log('query categories ended')
    }
}

async function getProductsFromCategories(categorieName) {
    try {
        const SQL = `
            SELECT 
                products.id,
                products.name, 
                categories.categorie AS categorie,
                sizes.size AS size,
                colors.color AS color,
                products.price
            FROM products
            JOIN categories ON products.categorieID = categories.id
            JOIN sizes ON products.sizeID = sizes.id
            JOIN colors ON products.colorID = colors.id
            WHERE categories.categorie = $1;
        `;

        const { rows } = await pool.query(SQL, [categorieName]);
        return rows;  
    } catch (error) {
        console.error(error.stack);
    } finally {
        console.log('Query for products by category ended');
    }
}



export default { getAllData, getItem, getAllCategories, getProductsFromCategories };
