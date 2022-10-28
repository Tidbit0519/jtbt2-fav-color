import { RouteControllerMap } from 'openapi-enforcer-middleware'
import { Request, Response } from 'express'

export default function (): RouteControllerMap {
  return {
    async listFavoriteColors (req: Request, res: Response) {
      res.enforcer?.send({
        result: ['red', 'green']
      })
    },
    async addFavoriteColor (req: Request, res: Response) {
      const personFavoriteColor: string = req.enforcer?.body.favoriteColor
      const byuId: string = req.enforcer?.body.byuId
      res.enforcer?.send({
        result: 'success'
      })
    }
  }
}
