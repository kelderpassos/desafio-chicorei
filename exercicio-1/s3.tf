resource "aws_s3_bucket" "ec2_bucket" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_policy" "ec2_bucket_policy" {
  bucket = aws_s3_bucket.ec2_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Principal = {
          Service = "ec2.amazonaws.com"
        },
        Action = [
          "s3:*",
        ]
        Effect = "Allow"
        Resource = [
          "arn:aws:s3:::${aws_s3_bucket.ec2_bucket.id}",
          "arn:aws:s3:::${aws_s3_bucket.ec2_bucket.id}/*"
]
      },
    ]
  })
}
