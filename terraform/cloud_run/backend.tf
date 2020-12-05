terraform {
  backend "gcs" {
    bucket = "momonabot-tfstate"
  }
}