import supertest from 'supertest'
import { app } from '../index'

// supertest request object
const request = supertest(app)

describe('Test Endpoint Response', () => {
    it('should return 200 status code when enter / endpoint', async () => {
        const response = await request.get('/')
        expect(response.statusCode).toEqual(200)
    })
    it('should resize the dog image and create the new one returned status code should be 201', async () => {
        const response = await request.get(
            '/imageprocessing?name=dog&width=800&height=100'
        )
        expect(response.statusCode).toBe(201)
    })
    it('should return 404 status code image not found', async () => {
        const response = await request.get('/api/images?filename=myphoto')
        expect(response.statusCode).toBe(404)
    })
})
