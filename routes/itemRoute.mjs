import express from 'express'
import itemController from '../controllers/itemController.mjs'

const router = express.Router()

router.get('/', itemController.getItem)

export default router