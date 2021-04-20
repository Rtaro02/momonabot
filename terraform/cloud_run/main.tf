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

resource "google_cloud_run_service" "momonabot" {
  for_each = toset([
    "ameba-momona",  
    "ameba-others",
    "eline",
    "hpfc",
    "instagram",
    "instagram-others",
    "retweet"
  ])
  name                       = each.value
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
          limits = tomap({
            "cpu" = "1000m",
            "memory" = "2048Mi"
          })
        }
      }
      timeout_seconds = 600
    }
  }
}

resource "google_cloud_run_service_iam_member" "momonabot" {
  for_each = toset([
    "ameba-momona",  
    "ameba-others",
    "eline",  
    "hpfc",
    "instagram",
    "instagram-others",
    "retweet"
  ])
  location = google_cloud_run_service.momonabot[each.value].location
  project = google_cloud_run_service.momonabot[each.value].project
  service = google_cloud_run_service.momonabot[each.value].name
  role = "roles/editor"
  member = "serviceAccount:${google_service_account.cloudrun.email}"
}

resource "google_cloud_run_service" "ameba_past" {
  name                       = "ameba-past"
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
          limits = tomap({
            "cpu" = "2000m",
            "memory" = "4096Mi"
          })
        }
      }
      timeout_seconds = 600
    }
  }
}

resource "google_cloud_run_service_iam_member" "ameba_past" {
  location = google_cloud_run_service.ameba_past.location
  project = google_cloud_run_service.ameba_past.project
  service = google_cloud_run_service.ameba_past.name
  role = "roles/editor"
  member = "serviceAccount:${google_service_account.cloudrun.email}"
}

module "ameba-momona-1" {
  source = "../module/cloud_scheduler"

  name     = "ameba-momona-1"
  schedule = "*/30 10-23 * * *"
  path     = "/ameba/momona"
  cloudrun = google_cloud_run_service.momonabot["ameba-momona"].status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "ameba-momona-2" {
  source = "../module/cloud_scheduler"

  name     = "ameba-momona-2"
  schedule = "*/30 0-2 * * *"
  path     = "/ameba/momona"
  cloudrun = google_cloud_run_service.momonabot["ameba-momona"].status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "ameba-others-1" {
  source = "../module/cloud_scheduler"

  name     = "ameba-others-1"
  schedule = "*/30 18-23 * * *"
  path     = "/ameba/others"
  cloudrun = google_cloud_run_service.momonabot["ameba-others"].status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "ameba-others-2" {
  source = "../module/cloud_scheduler"

  name     = "ameba-others-2"
  schedule = "*/30 0-2 * * *"
  path     = "/ameba/others"
  cloudrun = google_cloud_run_service.momonabot["ameba-others"].status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "ameba-past-2016" {
  source = "../module/cloud_scheduler"

  name     = "ameba-past-2016"
  schedule = "30 9 * * *"
  path     = "/ameba/past/2016"
  cloudrun = google_cloud_run_service.ameba_past.status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "ameba-past-2017" {
  source = "../module/cloud_scheduler"

  name     = "ameba-past-2017"
  schedule = "31 9 * * *"
  path     = "/ameba/past/2017"
  cloudrun = google_cloud_run_service.ameba_past.status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "ameba-past-2018" {
  source = "../module/cloud_scheduler"

  name     = "ameba-past-2018"
  schedule = "32 9 * * *"
  path     = "/ameba/past/2018"
  cloudrun = google_cloud_run_service.ameba_past.status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "ameba-past-2019" {
  source = "../module/cloud_scheduler"

  name     = "ameba-past-2019"
  schedule = "33 9 * * *"
  path     = "/ameba/past/2019"
  cloudrun = google_cloud_run_service.ameba_past.status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "ameba-past-2020" {
  source = "../module/cloud_scheduler"

  name     = "ameba-past-2020"
  schedule = "34 9 * * *"
  path     = "/ameba/past/2020"
  cloudrun = google_cloud_run_service.ameba_past.status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "ameba-past-2021" {
  source = "../module/cloud_scheduler"

  name     = "ameba-past-2021"
  schedule = "35 9 * * *"
  path     = "/ameba/past/2021"
  cloudrun = google_cloud_run_service.ameba_past.status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "ameba-past-2022" {
  source = "../module/cloud_scheduler"

  name     = "ameba-past-2022"
  schedule = "36 9 * * *"
  path     = "/ameba/past/2022"
  cloudrun = google_cloud_run_service.ameba_past.status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "ameba-past-2023" {
  source = "../module/cloud_scheduler"

  name     = "ameba-past-2023"
  schedule = "37 9 * * *"
  path     = "/ameba/past/2023"
  cloudrun = google_cloud_run_service.ameba_past.status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "ameba-past-2024" {
  source = "../module/cloud_scheduler"

  name     = "ameba-past-2024"
  schedule = "38 9 * * *"
  path     = "/ameba/past/2024"
  cloudrun = google_cloud_run_service.ameba_past.status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "ameba-past-2025" {
  source = "../module/cloud_scheduler"

  name     = "ameba-past-2025"
  schedule = "39 9 * * *"
  path     = "/ameba/past/2025"
  cloudrun = google_cloud_run_service.ameba_past.status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "eline" {
  source = "../module/cloud_scheduler"

  name     = "eline"
  schedule = "0 12-18 * * *"
  path     = "/eline"
  cloudrun = google_cloud_run_service.momonabot["eline"].status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "hpfc" {
  source = "../module/cloud_scheduler"

  name     = "hpfc"
  schedule = "0 12-21 * * *"
  path     = "/hpfc"
  cloudrun = google_cloud_run_service.momonabot["hpfc"].status[0].url
  service_account_email = google_service_account.cloudrun.email
}

module "instagram" {
  source = "../module/cloud_scheduler"

  name     = "instagram"
  schedule = "*/30 12-23 * * *"
  path     = "/instagram/angerme"
  cloudrun = google_cloud_run_service.momonabot["instagram"].status[0].url
  service_account_email = google_service_account.cloudrun.email
}

# module "instagram-others" {
#   source = "../module/cloud_scheduler"

#   name     = "instagram-others"
#   schedule = "0 * * * *"
#   path     = "/instagram/others"
#   cloudrun = google_cloud_run_service.momonabot["instagram-others"].status[0].url
#   service_account_email = google_service_account.cloudrun.email
# }

module "retweet" {
  source = "../module/cloud_scheduler"

  name     = "retweet"
  schedule = "0 21 * * *"
  path     = "/retweet"
  cloudrun = google_cloud_run_service.momonabot["retweet"].status[0].url
  service_account_email = google_service_account.cloudrun.email
}