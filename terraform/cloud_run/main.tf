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

resource "google_project_iam_member" "firestore" {
  project = var.gcp_project
  for_each = toset([
    "roles/firebase.admin"   
  ])
  role   = each.value
  member = "serviceAccount:${google_service_account.firestore.email}"
}

resource "google_project_iam_member" "cloudrun" {
  project = var.gcp_project
  for_each = toset([
    "roles/editor"   
  ])
  role   = each.value
  member = "serviceAccount:${google_service_account.cloudrun.email}"
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

module "ameba-momona-1" {
  source = "../module/cloud_scheduler"

  name     = "ameba-momona-1"
  schedule = "*/5 13-23 * * *"
  path     = "/ameba/momona"
  cloudrun = google_cloud_run_service.this.status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "ameba-momona-2" {
  source = "../module/cloud_scheduler"

  name     = "ameba-momona-2"
  schedule = "*/5 0-1 * * *"
  path     = "/ameba/momona"
  cloudrun = google_cloud_run_service.this.status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "ameba-others-1" {
  source = "../module/cloud_scheduler"

  name     = "ameba-others-1"
  schedule = "*/5 18-23 * * *"
  path     = "/ameba/others"
  cloudrun = google_cloud_run_service.this.status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "ameba-others-2" {
  source = "../module/cloud_scheduler"

  name     = "ameba-others-2"
  schedule = "*/5 0-1 * * *"
  path     = "/ameba/others"
  cloudrun = google_cloud_run_service.this.status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "ameba-past-2016" {
  source = "../module/cloud_scheduler"

  name     = "ameba-past-2016"
  schedule = "30 18 * * *"
  path     = "/ameba/past/2016"
  cloudrun = google_cloud_run_service.this.status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "ameba-past-2017" {
  source = "../module/cloud_scheduler"

  name     = "ameba-past-2017"
  schedule = "32 18 * * *"
  path     = "/ameba/past/2017"
  cloudrun = google_cloud_run_service.this.status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "ameba-past-2018" {
  source = "../module/cloud_scheduler"

  name     = "ameba-past-2018"
  schedule = "34 18 * * *"
  path     = "/ameba/past/2018"
  cloudrun = google_cloud_run_service.this.status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "ameba-past-2019" {
  source = "../module/cloud_scheduler"

  name     = "ameba-past-2019"
  schedule = "36 18 * * *"
  path     = "/ameba/past/2019"
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