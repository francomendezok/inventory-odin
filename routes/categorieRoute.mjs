import express from 'express'
import categorieController from '../controllers/categorieController.mjs'

const router = express.Router()

router.get('/:categorie', categorieController.getCategorie)

export default router