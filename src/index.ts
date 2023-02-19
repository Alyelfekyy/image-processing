import express, { Application, Request, Response } from 'express'
import routes from './routes/index'

export const app: Application = express()
const port = 3000
export const srcFolder = __dirname

app.use(express.static(srcFolder))

app.use('/', routes)

app.get('/', (req: Request, res: Response): Response => {
    return res.send('Welcom To Image Processing API')
})

app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})
