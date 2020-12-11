terraform {
  backend "gcs" {
    bucket = "momonabot-tfstate"
    prefix  = "terraform/gke"
  }
}