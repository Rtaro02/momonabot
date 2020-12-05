provider "google" {
  project = var.gcp_project
  region  = var.default_region
  zone    = var.default_zone
}

provider "google-beta" {
  project = var.gcp_project
  region  = var.default_region
  zone    = var.default_zone
}