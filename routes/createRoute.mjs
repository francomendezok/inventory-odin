import express from 'express'
import createController from '../controllers/createController.mjs'

const router = express.Router()

router.get('/:categorie', createController.renderCreateItem)

router.post('/:categorie', createController.createProductInTable)

export default router