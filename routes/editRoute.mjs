import express from 'express'
import editController from '../controllers/editController.mjs'

const router = express.Router()

router.get('/:id', editController.editItem)

export default router