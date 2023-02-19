import { Router } from 'express'
import imageprocessing from './imageprocessing'

const routes = Router()

routes.use('/imageprocessing', imageprocessing)
export default routes
