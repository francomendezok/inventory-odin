import expressAsyncHandler from "express-async-handler";
import db from '../db/queries.mjs'

const editItem = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    
    // Verifica que estás obteniendo el item correctamente
    const item = await db.getItem(id);
    console.log(item);  // Verifica qué se obtiene aquí

    if (!item) {
        // Si no se encuentra el item, envía una respuesta o muestra un error
        return res.status(404).send('Item not found');
    }

    res.render('edit', { item: item });
});

export default { editItem }

