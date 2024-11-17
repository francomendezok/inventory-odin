import expressAsyncHandler from "express-async-handler";
import db from '../db/queries.mjs'
import { validationResult } from "express-validator";
import { validateUpdateProduct } from "./formValidation.mjs";

const editItem = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const categories = await db.getAllCategories()
    const item = await db.getItem(id);

    if (!item) {
        return res.status(404).send('Item not found');
    }

    res.render('edit', { item: item, categories: categories });
});

// POST METHOD //
const updateItem = [
    validateUpdateProduct,
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {            
            return res.render('error', {error: errors.array()})
        }
        const product = req.body
        const status = db.editProductInDB(product)
        status ? res.redirect('/') : res.send("Error while editing product in db")
    }
]

export default { editItem, updateItem }

