import expressAsyncHandler from "express-async-handler";
import db from '../db/queries.mjs';

const createItem = expressAsyncHandler(async (req, res) => {
    const categorie = req.params.categorie;
    const allCategories = await db.getAllCategories()

    res.render('create', { categorie: categorie, categories: allCategories })
})

export default { createItem };