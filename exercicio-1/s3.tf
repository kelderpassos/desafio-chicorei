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
          "AWS" = "${aws_iam_role.ec2_iam_role.arn}"
        },
        Action = [
          "s3:GetObject",
          "s3:ListBucket"
        ],
        Effect = "Allow",
        Resource = [
          "arn:aws:s3:::${aws_s3_bucket.ec2_bucket.id}",
          "arn:aws:s3:::${aws_s3_bucket.ec2_bucket.id}/*"
        ]
      },
    ]
  })
}
