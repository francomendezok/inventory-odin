import pool from './pool.mjs';

async function getAllData() {
    try {
        const SQL = `
            SELECT 
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
        pool.end()
    }
    
}


export default { getAllData };
