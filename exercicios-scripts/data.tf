data "aws_caller_identity" "this" {}
data "aws_availability_zones" "azs" {}

data "aws_secretsmanager_secret_version" "rds-secrets" {
  secret_id = var.rds_secrets
}

data "aws_acm_certificate" "alb_certificate" {
  domain      = var.domain_name
  statuses    = ["ISSUED"]
  most_recent = true
}
