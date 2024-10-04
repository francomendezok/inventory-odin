import express from 'express'
import indexRoute from './routes/indexRoute.mjs'
import categorieRoute from './routes/categorieRoute.mjs'
import itemRoute from './routes/itemRoute.mjs'

const app = express()
const PORT = 3000

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', './views')

app.use('/', indexRoute)
app.use('/categories', categorieRoute)
app.use('/item', itemRoute)

app.listen(PORT, () => console.log(`listening on port ${PORT}!`))


// Create
// Read ✅
// Update
// Delete