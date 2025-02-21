# vpc
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = "true"
  enable_dns_hostnames = "true"
  instance_tenancy     = "default"

  tags = {
    Name       = "${var.project_name}-vpc"
    created_at = timestamp()
  }
}

resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.public_subnet
  availability_zone = local.az1

  tags = {
    Name        = "${var.project_name}-public-subnet"
    subnet_type = "public"
    created_at  = timestamp()
  }
}

resource "aws_subnet" "private_1" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet
  availability_zone = local.az1

  tags = {
    Name        = "${var.project_name}-private-subnet-1"
    subnet_type = "private"
    created_at  = timestamp()
  }
}

resource "aws_subnet" "private_2" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet
  availability_zone = local.az2

  tags = {
    Name        = "${var.project_name}-private-subnet-1"
    subnet_type = "private"
    created_at  = timestamp()
  }
}


# security group
resource "aws_security_group" "vpc" {
  name        = "main_vpc_security_group"
  vpc_id      = aws_vpc.main.id
  description = "Habilita trafego de entrada e saida para a VPC"

  tags = {
    Name       = "${var.project_name}-sg"
    created_at = timestamp()
  }
}

resource "aws_vpc_security_group_ingress_rule" "allow_ssh" {
  security_group_id = aws_security_group.vpc.id
  description       = "Habilita trafego de entrada SSH"
  ip_protocol       = "tcp"
  cidr_ipv4         = var.allowed_ssh_ip # apenas minha máquina acessa a instância
  from_port         = 22
  to_port           = 22

  tags = {
    Name       = "${var.project_name}-allow-ssh-rule"
    created_at = timestamp()
  }
}

resource "aws_vpc_security_group_ingress_rule" "allow_https" {
  security_group_id = aws_security_group.vpc.id
  description       = "Habilita trafego de entrada HTTPS"
  ip_protocol       = "tcp"
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 443
  to_port           = 443

  tags = {
    Name       = "${var.project_name}-allow-https-rule"
    created_at = timestamp()
  }
}

resource "aws_vpc_security_group_egress_rule" "allow_https" {
  security_group_id = aws_security_group.vpc.id
  description       = "Habilita todo trafego de saida"
  ip_protocol       = "tcp"
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 443
  to_port           = 443

  tags = {
    Name       = "${var.project_name}-allow_all"
    created_at = timestamp()
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name       = "${var.project_name}-igw"
    created_at = timestamp()
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name       = "${var.project_name}-public-rt"
    rt_type    = "public"
    created_at = timestamp()
  }
}

resource "aws_route_table_association" "public" {
  route_table_id = aws_route_table.public.id
  subnet_id      = aws_subnet.public.id
}


# RDS
resource "aws_db_subnet_group" "rds_subnet_grp" {
  subnet_ids = ["${aws_subnet.private.id}"]

  tags = {
    Name        = "${var.project_name}-private-subnet-2"
    subnet_type = "private"
    created_at  = timestamp()
  }
}

resource "aws_security_group" "rds_sg" {
  name        = "rds_vpc_security_group"
  vpc_id      = aws_vpc.main.id
  description = "Habilita trafego do EC2 p/ RDS"

  tags = {
    Name       = "${var.project_name}-sg-rds"
    created_at = timestamp()
  }
}

resource "aws_vpc_security_group_ingress_rule" "rds_ingress_rule" {
  security_group_id = aws_security_group.rds_sg.id
  description       = "Habilita trafego de entrada p/ RDS"
  ip_protocol       = "tcp"
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 3306
  to_port           = 3306
}

resource "aws_vpc_security_group_egress_rule" "rds_egress" {
  security_group_id = aws_security_group.rds_sg.id
  description       = "Habilita todo trafego de saida"
  ip_protocol       = -1
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 0
  to_port           = 0

  tags = {
    Name       = "${var.project_name}-rds-egress"
    created_at = timestamp()
  }
}


