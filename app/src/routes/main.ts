import { RouteControllerMap } from 'openapi-enforcer-middleware'
import { Request, Response } from 'express'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand, PutCommand } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({
  region: process.env.AWS_REGION ?? 'us-west-2',
  endpoint: process.env.DYNAMODB_ENDPOINT // set the DYNAMODB_ENDPOINT to http://localhost:8000 when using local dynamo
})
const ddbDocClient = DynamoDBDocumentClient.from(client)

export default function (): RouteControllerMap {
  return {
    async listFavoriteColors (req: Request, res: Response) {
      const output = await ddbDocClient.send(
        new ScanCommand({
          TableName: 'jtbt2-fav-color-dev'
        })
      )
      if (output.Items !== undefined) {
        res.enforcer?.send(output.Items)
        console.log(output.Items)
      } else {
        res.enforcer?.send([{
          result: 'There are no favorite colors yet.'
        }])
      }
    },
    async addFavoriteColor (req: Request, res: Response) {
      const userFavoriteColor: string = req.enforcer?.body.favoriteColor
      const byuId: string = req.enforcer?.body.byuId
      const name: string = req.enforcer?.body.name
      await ddbDocClient.send(
        new PutCommand({
          TableName: 'jtbt2-fav-color-dev',
          Item: {
            byuId: byuId,
            favoriteColor: userFavoriteColor,
            name: name
          }
        })
      )
      res.enforcer?.send({
        result: 'Successfully added to database.'
      })
    }
  }
}
