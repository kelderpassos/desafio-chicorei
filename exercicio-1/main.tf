terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.8"
    }
  }

  backend "s3" {
    key            = "exercicio-1/terraform.tfstate"
    encrypt        = true
    region         = "us-east-1"
    dynamodb_table = "dynamodb-state-locking"
  }
}

provider "aws" {
  region  = var.region
  profile = var.aws_profile
}
