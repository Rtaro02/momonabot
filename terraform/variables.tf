variable "gcp_project" {
  default = "momonabot"
}
variable "default_zone" {
  default = "asia-northeast1-a"
}
variable "default_region" {
  default = "asia-northeast1"
}
variable "default_area" {
  default = "asia"
}
variable "time_zone" {
  default = "Asia/Tokyo"
}
variable "runtime" {
  default = "nodejs10"
}
variable "start_topic" {
  default = "start-instance-event"
}
variable "stop_topic" {
  default = "stop-instance-event"
}