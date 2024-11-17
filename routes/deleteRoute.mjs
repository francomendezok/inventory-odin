import express from 'express'
import deleteController from '../controllers/deleteController.mjs'

const router = express.Router()

router.get('/:id', deleteController.renderDeleteItem)

router.post('/:id', deleteController.deleteProductInTable)

export default router