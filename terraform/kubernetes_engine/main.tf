resource "google_service_account" "gke" {
  account_id   = "momonabot-gke-sa"
  display_name = "momonabot gke"
  project      = var.gcp_project
}

resource "google_project_iam_member" "gke_node_pool_roles" {
  project = var.gcp_project
  for_each = toset([
    "roles/storage.admin"   
  ])
  role   = each.value
  member = "serviceAccount:${google_service_account.gke.email}"
}

resource "google_storage_bucket_iam_member" "gke_bucket" {
  bucket = "artifacts.momonabot.appspot.com"
  role   = "roles/storage.admin"
  member = "serviceAccount:${google_service_account.gke.email}"
}

resource "google_container_cluster" "this" {
  name               = "momona-cluster"
  location           = var.zone
  initial_node_count = 3

  master_auth {
    username = ""
    password = ""

    client_certificate_config {
      issue_client_certificate = false
    }
  }
 
  node_config {
    preemptible  = true
    machine_type = "e2-micro"
    metadata = {
      disable-legacy-endpoints = "true"
    }
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
    service_account = google_service_account.gke.email
  }
}
