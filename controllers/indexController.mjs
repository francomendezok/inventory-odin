import expressAsyncHandler from "express-async-handler";

const getIndex = expressAsyncHandler(async (req, res) => {
    res.render("index");    
})

export default {getIndex}