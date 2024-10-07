import expressAsyncHandler from "express-async-handler";
import db from '../db/queries.mjs'

const getIndex = expressAsyncHandler(async (req, res) => {
    const products = await db.getAllData()
    
    res.render("index", {products: products});    
})

export default {getIndex}