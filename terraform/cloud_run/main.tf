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
    # "ameba-momona",
    "ameba-others",
    "eline",
    # "hpfc",
    # "instagram",
    # "instagram-others",
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
            "cpu"    = "1000m",
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
    # "ameba-momona",
    "ameba-others",
    "eline",
    # "hpfc",
    # "instagram",
    # "instagram-others",
    "retweet"
  ])
  location = google_cloud_run_service.momonabot[each.value].location
  project  = google_cloud_run_service.momonabot[each.value].project
  service  = google_cloud_run_service.momonabot[each.value].name
  role     = "roles/editor"
  member   = "serviceAccount:${google_service_account.cloudrun.email}"
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
            "cpu"    = "2000m",
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
  project  = google_cloud_run_service.ameba_past.project
  service  = google_cloud_run_service.ameba_past.name
  role     = "roles/editor"
  member   = "serviceAccount:${google_service_account.cloudrun.email}"
}

resource "google_compute_network" "momonabot_network" {
  name                    = "momonabot-network"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "momonabot_subnetwork" {
  name          = "momonabot-subnetwork"
  ip_cidr_range = "10.128.0.0/20"
  region        = "us-central1"
  network       = google_compute_network.momonabot_network.id
}

resource "google_compute_firewall" "allow_iap" {
  name          = "allow-iap-ingress"
  network       = google_compute_network.momonabot_network.name
  priority      = 1000
  source_ranges = ["35.235.240.0/20"]

  allow {
    protocol = "tcp"
    ports    = ["22", "3389"]
  }
}

resource "google_compute_firewall" "deny_all_ingress" {
  name          = "deny-all-ingress"
  network       = google_compute_network.momonabot_network.name
  priority      = 65535
  source_ranges = ["0.0.0.0/0"]

  deny {
    protocol = "all"
  }
}

resource "google_compute_instance" "momonabot_vm" {
  name                      = "momonabot-vm"
  machine_type              = "e2-micro"
  zone                      = "us-central1-b"
  allow_stopping_for_update = true

  tags = ["momonabot"]

  boot_disk {
    initialize_params {
      size  = 30
      type  = "pd-standard"
      image = "debian-cloud/debian-10"
    }
  }

  network_interface {
    network    = google_compute_network.momonabot_network.name
    subnetwork = google_compute_subnetwork.momonabot_subnetwork.name
    access_config {
    }
  }

  metadata = {
  }

  metadata_startup_script = templatefile("./startup_script.sh", {
    ameba_other_cron_1   = "*/30 18-23 * * *"
    ameba_other_cron_2   = "*/30 0-2 * * *"
    ameba_other_url      = "${google_cloud_run_service.momonabot["ameba-others"].status[0].url}/ameba/others"
    ameba_past_cron_2016 = "30 9 * * *"
    ameba_past_url_2016  = "${google_cloud_run_service.ameba_past.status[0].url}/ameba/past/2016"
    ameba_past_cron_2017 = "31 9 * * *"
    ameba_past_url_2017  = "${google_cloud_run_service.ameba_past.status[0].url}/ameba/past/2017"
    ameba_past_cron_2018 = "32 9 * * *"
    ameba_past_url_2018  = "${google_cloud_run_service.ameba_past.status[0].url}/ameba/past/2018"
    ameba_past_cron_2019 = "33 9 * * *"
    ameba_past_url_2019  = "${google_cloud_run_service.ameba_past.status[0].url}/ameba/past/2019"
    ameba_past_cron_2020 = "34 9 * * *"
    ameba_past_url_2020  = "${google_cloud_run_service.ameba_past.status[0].url}/ameba/past/2020"
    ameba_past_cron_2021 = "35 9 * * *"
    ameba_past_url_2021  = "${google_cloud_run_service.ameba_past.status[0].url}/ameba/past/2021"
    ameba_past_cron_2022 = "36 9 * * *"
    ameba_past_url_2022  = "${google_cloud_run_service.ameba_past.status[0].url}/ameba/past/2022"
    ameba_past_cron_2023 = "37 9 * * *"
    ameba_past_url_2023  = "${google_cloud_run_service.ameba_past.status[0].url}/ameba/past/2023"
    ameba_past_cron_2024 = "38 9 * * *"
    ameba_past_url_2024  = "${google_cloud_run_service.ameba_past.status[0].url}/ameba/past/2024"
    ameba_past_cron_2025 = "39 9 * * *"
    ameba_past_url_2025  = "${google_cloud_run_service.ameba_past.status[0].url}/ameba/past/2025"
    eline_cron           = "0 12-18 * * *"
    eline_url            = "${google_cloud_run_service.momonabot["eline"].status[0].url}/eline"
    retweet_cron         = "0 21 * * *"
    retweet_url          = "${google_cloud_run_service.momonabot["retweet"].status[0].url}/retweet"
  })

  service_account {
    email  = google_service_account.cloudrun.email
    scopes = ["cloud-platform"]
  }
}