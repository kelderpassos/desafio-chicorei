resource "aws_cloudwatch_log_group" "ec2_log_group" {
  name              = "/ec2/${var.project_name}"
  retention_in_days = 7
}
