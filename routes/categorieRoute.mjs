import express from 'express'
import categorieController from '../controllers/categorieController.mjs'

const router = express.Router()

router.get('/', categorieController.getCategorie)

export default router