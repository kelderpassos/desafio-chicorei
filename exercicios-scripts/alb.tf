# application load balancer
resource "aws_lb" "application_load_balancer" {
  name               = "${var.project_name}-lb"
  internal           = false
  ip_address_type    = "ipv4"
  load_balancer_type = "application"
  security_groups    = [aws_security_group.ec2_sg.id]
  subnets            = [aws_subnet.public.id]


  tags = {
    name       = "${var.project_name}-lb"
    created_at = timestamp()
  }
}

# target group
resource "aws_lb_target_group" "target_group" {
  name        = "${var.project_name}-lb-tg"
  target_type = "instance"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id

  health_check {
    enabled             = true
    interval            = 30
    timeout             = 5
    path                = "/"
    matcher             = "200-399,404"
    healthy_threshold   = 5
    unhealthy_threshold = 5
  }

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    name       = "${var.project_name}-lb-tg"
    created_at = timestamp()
  }
}

resource "aws_lb_target_group_attachment" "ec2_instances" {
  count = 2

  target_group_arn = aws_lb_target_group.target_group.arn
  target_id        = aws_instance.ec2[count.index].id
  port             = 80
}

# listener
resource "aws_lb_listener" "alb-listener-http" {
  load_balancer_arn = aws_lb.application_load_balancer.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      protocol    = "HTTPS"
      port        = "443"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "alb-listener-https" {
  load_balancer_arn = aws_lb.application_load_balancer.arn
  port              = "443"
  protocol          = "HTTPS"

  ssl_policy      = "ELBSecurityPolicy-2016-08"
  certificate_arn = data.aws_acm_certificate.alb_certificate

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.target_group.arn
  }
}

