data "aws_caller_identity" "this" {}
data "aws_availability_zones" "azs" {}

data "aws_secretsmanager_secret_version" "rds-secrets" {
  secret_id = var.rds_secrets
}