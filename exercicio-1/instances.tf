resource "aws_db_instance" "rds_instance" {
  allocated_storage    = 10
  storage_type         = "gp2"
  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = var.rds_instance
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