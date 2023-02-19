import Router, { Request, Response } from 'express'
import path from 'path'
import { promises as fsPromises } from 'fs'
import { srcFolder } from '..'
import { resizeImage } from '../imageHelper/imgHelper'
import {
    checkvalues,
    imagealreadyExistMiddleware,
    imagenotExistMiddleware,
} from '../middlewares/middlewares'

//console.log(__dirname)
const imageprocessing = Router()

const middlewares = [
    checkvalues,
    imagenotExistMiddleware,
    imagealreadyExistMiddleware,
]

imageprocessing.get(
    '/',
    middlewares,
    async (req: Request, res: Response): Promise<void> => {
        const name = req.query.name as string
        const width = parseInt(req.query.width as string) as number
        const height = parseInt(req.query.height as string) as number

        const input = path.join(srcFolder, `/images/original/${name}.jpg`)

        const output = path.join(
            srcFolder,
            `/images/resized/${name}-${width}x${height}.jpg`
        )
        console.log(output)
        try {
            const resizedImage = await resizeImage(input, height, width)
            await fsPromises.writeFile(output, resizedImage)
            return res.status(201).sendFile(output)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'message' })
        }
    }
)

export default imageprocessing
