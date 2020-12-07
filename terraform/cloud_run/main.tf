
resource "google_service_account" "firestore" {
  account_id   = "momonabot-firestore-sa"
  display_name = "momonabot firestore"
  project      = var.gcp_project
}

resource "google_service_account" "cloudrun" {
  account_id   = "momonabot-cloudrun-sa"
  display_name = "momonabot cloudrun"
  project      = var.gcp_project
}

resource "google_project_iam_binding" "firestore" {
  project = var.gcp_project
  role    = "roles/firebase.admin"
  members = [
    join(":", list("serviceAccount", google_service_account.firestore.email))
  ]
}

resource "google_project_iam_binding" "cloudrun" {
  project = var.gcp_project
  role    = "roles/editor"
  members = [
    join(":", list("serviceAccount", google_service_account.cloudrun.email))
  ]
}

resource "google_cloud_run_service" "this" {
  name                       = "momonabot"
  location                   = "us-central1"
  autogenerate_revision_name = true

  template {
    spec {
      containers {
        image = var.gcr_uri
        ports {
          container_port = 8080
        }
        resources {
          limits = map(
            "cpu", "2000m",
            "memory", "4096Mi"
          )
        }
      }
      timeout_seconds = 600
    }
  }
}

resource "google_cloud_run_service_iam_member" "this" {
  location = google_cloud_run_service.this.location
  project = google_cloud_run_service.this.project
  service = google_cloud_run_service.this.name
  role = "roles/editor"
  member = join(":", list("serviceAccount", google_service_account.cloudrun.email))
}

module "ameba-momona" {
  source = "../module/cloud_scheduler"

  name     = "ameba-momona"
  schedule = "*/5 13-23 * * *"
  path     = "/ameba/momona"
  cloudrun = google_cloud_run_service.this.status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "ameba-others" {
  source = "../module/cloud_scheduler"

  name     = "ameba-others"
  schedule = "*/10 18-23 * * *"
  path     = "/ameba/others"
  cloudrun = google_cloud_run_service.this.status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "ameba-past" {
  source = "../module/cloud_scheduler"

  name     = "ameba-past"
  schedule = "30 12 * * *"
  path     = "/ameba/past"
  cloudrun = google_cloud_run_service.this.status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "eline" {
  source = "../module/cloud_scheduler"

  name     = "eline"
  schedule = "*/10 12-18 * * *"
  path     = "/eline"
  cloudrun = google_cloud_run_service.this.status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "hpfc" {
  source = "../module/cloud_scheduler"

  name     = "hpfc"
  schedule = "*/10 12-20 * * *"
  path     = "/hpfc"
  cloudrun = google_cloud_run_service.this.status[0].url
  service_account_email = google_service_account.cloudrun.email
}

# module "instagram" {
#   source = "../module/cloud_scheduler"

#   name     = "instagram"
#   schedule = "0 12-23 * * *"
#   path     = "/instagram"
#   cloudrun = google_cloud_run_service.this.status[0].url
#   service_account_email = google_service_account.cloudrun.email
# }