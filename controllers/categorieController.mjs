import expressAsyncHandler from "express-async-handler";

const getCategorie = expressAsyncHandler(async (req, res) => {
    res.render("categories");    
})

export default {getCategorie}