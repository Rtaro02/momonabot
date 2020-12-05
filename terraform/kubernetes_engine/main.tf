resource "google_container_cluster" "this" {
  name               = "momona-cluster"
  location           = "asia-northeast1-a"
  initial_node_count = 3

  master_auth {
    username = ""
    password = ""

    client_certificate_config {
      issue_client_certificate = false
    }
  }

  node_config {
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]

    metadata = {
      disable-legacy-endpoints = "true"
    }

    preemptible = true

  }

  timeouts {
    create = "30m"
    update = "40m"
  }
}
