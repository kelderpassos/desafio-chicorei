#projeto
variable "aws_profile" {}
variable "environment" {}
variable "project_name" {}
variable "rds_secrets" {}
variable "region" {}

# instances
variable "ami" {}
variable "ec2_instance_type" {}
variable "key_name" {}
variable "rds_instance_type" {}

# s3
variable "bucket_name" {}

# vpc
variable "allowed_ssh_ip" {}
variable "public_subnet" {}
variable "private_subnet" {}
variable "vpc_cidr" {}

