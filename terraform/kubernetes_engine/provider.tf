provider "google" {
  project = var.gcp_project
}

provider "google-beta" {
  project = var.gcp_project
}