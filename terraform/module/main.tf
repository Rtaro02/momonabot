resource "google_cloud_scheduler_job" "main" {
  name      = var.name
  schedule  = var.schedule
  time_zone = var.time_zone
  http_target {
    uri = join("", list(var.cloudrun, var.path))
    http_method = "GET"
    oidc_token {
      service_account_email = var.service_account_email
    }
  }
}