import sharp from 'sharp'

export const resizeImage = (
    filepath: string,
    height: number,
    width: number
): Promise<Buffer> => {
    return sharp(filepath)
        .resize({
            width: width,
            height: height,
        })
        .toBuffer()
}
