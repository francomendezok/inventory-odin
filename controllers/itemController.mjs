import expressAsyncHandler from "express-async-handler";
import db from '../db/queries.mjs'

const getItem = expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    const item = await db.getItem(id)

    res.render("item", { item: item });    
})

export default {getItem}