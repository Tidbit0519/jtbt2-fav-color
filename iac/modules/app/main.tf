resource "aws_dynamodb_table" "my_dynamo_table" {
  hash_key     = "byuId"
  name         = "${local.repo_name}-${var.env}"
  billing_mode = "PAY_PER_REQUEST"
  attribute {
    name = "byuId"
    type = "S"
  }
}
resource "aws_iam_policy" "dynamo_access" {
  name        = "${aws_dynamodb_table.my_dynamo_table.name}-access"
  description = "Access to the ${aws_dynamodb_table.my_dynamo_table.name} DynamoDB table"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "dynamodb:DescribeTable",
          "dynamodb:Get*",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:Update*",
          "dynamodb:PutItem",
          "dynamodb:DeleteItem"
        ],
        Resource = [
          aws_dynamodb_table.my_dynamo_table.arn,
          "${aws_dynamodb_table.my_dynamo_table.arn}/index/*"
        ]
      }
    ]
  })
}
