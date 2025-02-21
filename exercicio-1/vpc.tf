resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr
  enable_dns_support = "true"
  enable_dns_hostnames = "true"
  instance_tenancy = "default"

  tags = {
    Name = "${var.project_name}-vpc"
    created_at = timestamp()
  }
}

resource "aws_subnet" "public" {
  vpc_id = aws_vpc.main.id
  cidr_block = var.public_subnet
  availability_zone = var.az1

  tags = {
    Name = "${var.project_name}-public-subnet-1"
    subnet_type = "public"
    created_at = timestamp()
  }
}

resource "aws_subnet" "private" {
  vpc_id = aws_vpc.main.id
  cidr_block = var.private_subnet
  availability_zone = var.az1

  tags = {
    Name = "${var.project_name}-private-subnet-2"
    subnet_type = "private"
    created_at = timestamp()
  }
}





