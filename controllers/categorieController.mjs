import expressAsyncHandler from "express-async-handler";
import db from '../db/queries.mjs';

const getCategorie = expressAsyncHandler(async (req, res) => {
    const categorie = req.params.categorie; 
    const categories = await db.getAllCategories()
    const products = await db.getProductsFromCategories(categorie); 

    if (products.length) {
        res.render("category", { categories: categories, products: products }); 
    } else {
        res.render("no-category", { categories: categories, categorie: categorie }); 
    }
});

export default { getCategorie };
