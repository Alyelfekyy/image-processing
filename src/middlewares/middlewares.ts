import { NextFunction, Request, Response } from 'express'
import path from 'path'
import fs from 'fs'
import { srcFolder } from '..'

export const checkvalues = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const width = parseInt(req.query.width as string) as number
    const height = parseInt(req.query.height as string) as number
    if (Number.isNaN(width) || width < 0 || width == 0) {
        res.status(500).json({
            message: 'width value is 0 or negative value or not number',
        })
    }
    if (Number.isNaN(height) || height < 0 || height == 0) {
        res.status(500).json({
            message: 'height value is  0 or negative value or not number',
        })
    }
    next()
}

export const imagenotExistMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const name = req.query.name as string
    const input = path.join(srcFolder, `/images/original/${name}.jpg`)
    console.log(input)
    const exist = fs.existsSync(input)
    console.log(exist)
    if (!exist) {
        throw new Error('IMAGE NOT FOUND')
    }

    next()
}

export const imagealreadyExistMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const name = req.query.name as string
    const width = req.query.name as string
    const height = req.query.name as string
    const file = path.join(
        srcFolder,
        `/images/resized/${name}_${width}*${height}.jpg`
    )
    const exist = fs.existsSync(file)
    if (exist) {
        return res.status(200).sendFile(file as string)
    }
    next()
}
