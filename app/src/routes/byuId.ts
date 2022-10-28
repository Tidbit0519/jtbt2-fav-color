import { RouteControllerMap } from 'openapi-enforcer-middleware'
import { Request, Response } from 'express'

export default function (): RouteControllerMap {
    return {
        async getFavoriteColor (req: Request, res: Response) {
            res.enforcer?.send({
                favoriteColor: 'blue'
            })
        },

        async updateFavoriteColor (req: Request, res: Response) {
            res.enforcer?.send({
                result: 'success'
            })
        },

        async removeFavoriteColor (req: Request, res: Response) {
            res.enforcer?.send({
                result: 'success'
            })
        }
    }
}