output "wordpress_public_ip" {
  description = "ID publico da instancia"
  value       = aws_instance.ec2.public_ip
}

output "ec2_endpoint" {
  description = "Nome DNS da instancia"
  value       = aws_instance.ec2.public_dns
}
