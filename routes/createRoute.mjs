import express from 'express'
import createController from '../controllers/createController.mjs'

const router = express.Router()

router.get('/:categorie', createController.createItem)

export default router