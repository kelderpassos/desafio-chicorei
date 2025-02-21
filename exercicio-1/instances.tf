data "template_file" "userdata" {
  template = file("${path.module}/userdata.sh")
}

resource "tls_private_key" "rsa" {
  algorithm = "RSA"
  rsa_bits = 4096
}

resource "aws_key_pair" "terraform_key" {
  key_name = var.key_name
  public_key = tls_private_key.rsa.public_key_openssh
}

resource "aws_instance" "ec2_instance" {
  depends_on = [ aws_db_instance.rds_instance ]

  ami = var.ami
  instance_type = var.ec2_instance_type
  subnet_id = aws_subnet.public.id
  vpc_security_group_ids = [ "${aws_security_group.ec2_sg.id}" ]
  associate_public_ip_address = true
  user_data = data.template_file.userdata.rendered
  key_name = aws_key_pair.terraform_key

  tags = {
    Name = "${var.project_name}-instance"
    created_at = timestamp()
  }
}

resource "aws_db_instance" "rds_instance" {
  allocated_storage    = 10
  max_allocated_storage = 20
  storage_type         = "gp2"
  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = var.rds_instance_type
  identifier           = "${var.project_name}-rds"
  db_name              = local.secrets.db_name
  username             = local.secrets.db_username
  password             = local.secrets.db_password
  parameter_group_name = "default.mysql8.0"
  db_subnet_group_name = aws_db_subnet_group.rds_subnet_grp.name
  skip_final_snapshot  = true
  vpc_security_group_ids = [aws_security_group.rds_sg.id]
 
  tags = {
    Name = "${var.project_name}-rds"
    created_at = timestamp()
  }
}