import server from '../src/server'
import request from 'supertest'
import { Application } from 'express'

let app: Application

beforeAll(async () => {
  app = await server()
})

describe('GET /health', () => {
  test('should return 200', async () => {
    const response = await request(app).get('/health')
    expect(response.statusCode).toBe(200)
  })
})

describe('GET /foo', () => {
  test('should return 200', async () => {
    const response = await request(app).get('/foo')
    expect(response.statusCode).toBe(200)
    expect(response.body.bar).toEqual('hello world')
  })
})

describe('POST /addFavoriteColor', () => {
  test('should return 200', async () => {
    const response = await request(app).get('/addFavoriteColor')
    expect(response.statusCode).toBe(200)
  })
})

describe('GET /listFavoriteColors', () => {
  test('should return 200', async () => {
    const response = await request(app).get('/listFavoriteColors')
    expect(response.statusCode).toBe(200)
  })
})

describe('GET /getFavoriteColors', () => {
  test('should return 200', async () => {
    const response = await request(app).get('/getFavoriteColor')
    expect(response.statusCode).toBe(200)
  })
})

describe('PUT /updateFavoriteColor', () => {
  test('should return 200', async () => {
    const response = await request(app).get('/updateFavoriteColor')
    expect(response.statusCode).toBe(200)
  })
})

describe('DELETE /removeFavoriteColor', () => {
  test('should return 200', async () => {
    const response = await request(app).get('/removeFavoriteColor')
    expect(response.statusCode).toBe(200)
  })
})
