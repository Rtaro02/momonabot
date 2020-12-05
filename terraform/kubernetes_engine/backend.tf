terraform {
  backend "gcs" {
    bucket = "momonabot-gke-tfstate"
  }
}