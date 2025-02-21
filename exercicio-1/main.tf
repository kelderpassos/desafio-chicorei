terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.8"
    }
  }

  backend "s3" {}
}

provider "aws" {
  region  = var.region
  profile = var.aws_profile
}

locals {
  account_id = data.aws_caller_identity.this.account_id
  az1        = data.aws_availability_zones.azs.names[0]
  az2        = data.aws_availability_zones.azs.names[1]

  secrets = {
    db_name = jsondecode(data.aws_secretsmanager_secret_version.rds-secrets.secret_string)["DATABASE_NAME"]
    db_username = jsondecode(data.aws_secretsmanager_secret_version.rds-secrets.secret_string)["DATABASE_USERNAME"]
    db_password = jsondecode(data.aws_secretsmanager_secret_version.rds-secrets.secret_string)["DATABASE_PASSWORD"]
  }
}
