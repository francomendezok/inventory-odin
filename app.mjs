import express from "express";
import indexRoute from './routes/indexRoute.mjs';
import categorieRoute from './routes/categorieRoute.mjs';
import itemRoute from './routes/itemRoute.mjs';
import editRoute from './routes/editRoute.mjs';
import deleteRoute from './routes/deleteRoute.mjs';
import createRoute from './routes/createRoute.mjs';

const app = express();
const PORT = 3000;



app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', indexRoute);
app.use('/category', categorieRoute);
app.use('/item', itemRoute);
app.use('/edit', editRoute);
app.use('/delete', deleteRoute)
app.use('/create', createRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`)});

// Create ✅
// Read ✅
// Update ✅
// Delete ✅

// Use libraries and middlewares to validate forms