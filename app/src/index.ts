import server from './server'
import defaultLogger from '@byu-oit/logger'
import { Logger } from 'pino'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({
  region: process.env.AWS_REGION ?? 'us-west-2',
  endpoint: process.env.DYNAMODB_ENDPOINT // set the DYNAMODB_ENDPOINT to http://localhost:8000 when using local dynamo
})

export const logger: Logger = defaultLogger()

async function run (): Promise<void> {
  const app = await server()
  app.listen(8080, () => {
    logger.info('listening on port 8080')
  }).on('error', err => {
    logger.error({ err }, 'Error starting the app')
  })
  const ddbDocClient = DynamoDBDocumentClient.from(client)
  const response = await ddbDocClient.send(new ScanCommand({ TableName: 'jtbt2-fav-color-dev' }))
  logger.info({ response }, 'DynamoDB response')
}

run()
  .then(r => {})
  .catch(err => logger.error({ err }, 'Error in running app!'))
