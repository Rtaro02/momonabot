# resource "google_service_account" "gke" {
#   account_id   = "momonabot-gke-sa"
#   display_name = "momonabot gke"
#   project      = var.gcp_project
# }

# resource "google_project_iam_binding" "gke" {
#   project = var.gcp_project
#   role    = "roles/editor"
#   members = [
#     join(":", list("serviceAccount", google_service_account.gke.email))
#   ]
# }

resource "google_container_cluster" "this" {
  name               = "momona-cluster"
  location           = "asia-northeast1-a"
  initial_node_count = 3
  node_config {
    preemptible  = true
    machine_type = "e2-micro"
    metadata = {
      disable-legacy-endpoints = "true"
    }
    # service_account = google_service_account.gke.email
  }
}