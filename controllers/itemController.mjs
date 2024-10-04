import expressAsyncHandler from "express-async-handler";

const getItem = expressAsyncHandler(async (req, res) => {
    res.render("item");    
})

export default {getItem}