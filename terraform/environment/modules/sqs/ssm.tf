resource "aws_ssm_parameter" "criteria_generate_queue_arn" {
  name  = "/terraform/${terraform.workspace}/sqs/criteria_generate_queue_arn"
  type  = "String"
  value = aws_sqs_queue.criteria_generate_queue.arn
}

resource "aws_ssm_parameter" "criteria_evaluate_queue_arn" {
  name  = "/terraform/${terraform.workspace}/sqs/criteria_evaluate_queue_arn"
  type  = "String"
  value = aws_sqs_queue.criteria_evaluate_queue.arn
}
