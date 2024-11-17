import expressAsyncHandler from "express-async-handler";
import db from '../db/queries.mjs';
import { validationResult } from "express-validator";
import { validateNewProduct } from "./formValidation.mjs";

const renderCreateItem = expressAsyncHandler(async (req, res) => {
    const categorie = req.params.categorie;
    const allCategories = await db.getAllCategories()

    res.render('create', { categorie: categorie, categories: allCategories })
})

// POST METHOD // 
const createProductInTable = [
    validateNewProduct,
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {            
            return res.render('error', {error: errors.array()})
        }
        const product = req.body
        const status = db.insertProduct(product)
        status ? res.redirect('/') : res.send("Error while adding product into db")
    }
]

export default { renderCreateItem, createProductInTable };