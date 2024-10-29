import expressAsyncHandler from "express-async-handler";
import db from '../db/queries.mjs'

const getIndex = expressAsyncHandler(async (req, res) => {
    const products = await db.getAllData()
    const categories = await db.getAllCategories()
    res.render("index", {products: products, categories: categories});    
})

export default {getIndex}