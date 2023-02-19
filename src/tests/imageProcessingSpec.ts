import path from 'path'
import { resizeImage } from '../imageHelper/imgHelper'
import { srcFolder } from '../index'
import { listImages, thumbnailExists } from '../utilities/filesystem'

describe('Image Processing Functionalities Test', async () => {
    it('should create thumbnail image and save it in resized folder ', async () => {
        const input = path.join(srcFolder, `/images/original/dog.jpg`)
        await resizeImage(input, 400, 400)
        expect(thumbnailExists('dog-400x400')).toBe(true)
    })

    describe('File System Functionalities Test', () => {
        it('should read all images in images folder and return array of images names and has dog img', async () => {
            const imagesArr = await listImages()
            expect(imagesArr).toContain('dog.jpg')
        })
    })
})
