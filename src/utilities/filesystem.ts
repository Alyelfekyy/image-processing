import { readdir, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const thumbnailPath = path.join(__dirname, '..', 'images', 'resized')

console.log(thumbnailPath)

export const thumbnailExists = (
    imageName: string,
    extension = 'jpg'
): boolean => {
    const filePath = path.join(thumbnailPath, `${imageName}.${extension}`)
    return existsSync(filePath)
}

export const listImages = async (): Promise<string[]> => {
    const imagesPath = path.join(__dirname, '..', 'images', 'original')
    try {
        const files = await readdir(imagesPath, { withFileTypes: true })
        const images = files.filter((file) => !file.isDirectory())
        const imagesName: string[] = []
        for (const image of images) {
            imagesName.push(image.name)
        }
        return imagesName
    } catch (error) {
        console.error(error)
        return []
    }
}

export const deleteFile = async (path: string): Promise<boolean> => {
    try {
        await unlink(path)
    } catch (error) {
        return false
    }
    return true
}
