import expressAsyncHandler from "express-async-handler";
import db from '../db/queries.mjs';

const renderDeleteItem = expressAsyncHandler(async (req, res) => {
    const item = await db.getItem(req.params.id)
    res.render("delete", { item: item })
})

// POST METHOD //
const deleteProductInTable = expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    const status = await db.deleteProductInTable(id)
    status ? res.redirect('/') : res.send("Error deleting product from db")
})

export default { renderDeleteItem, deleteProductInTable }