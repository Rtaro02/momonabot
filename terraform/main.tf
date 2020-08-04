provider "google" {
  credentials = file("~/.gcp/terraform-credential.json")
  project     = var.gcp_project
  region      = var.default_region
  zone        = var.default_zone
}

resource "google_compute_instance" "vm-instance" {
  name         = "momonabot"
  machine_type = "n1-standard-1"
  labels = {
    env = "tweet"
  }
  boot_disk {
    initialize_params {
      size  = 10
      type  = "pd-standard"
      image = "debian-cloud/debian-10"
    }
  }
  scheduling {
    preemptible       = true
    automatic_restart = false
  }
  network_interface {
    network = "default"
    access_config {
    }
  }
  metadata_startup_script = "sudo apt-get install -y git && git clone https://github.com/Rtaro02/docker-installer.git && bash docker-installer/install.sh"
}

resource "google_pubsub_topic" "start-instance-event" {
  name = var.start_topic
}

resource "google_pubsub_topic" "stop-instance-event" {
  name = var.stop_topic
}

resource "google_storage_bucket" "bucket" {
  name          = "momonabot"
  location      = var.default_region
  storage_class = "standard"
}

resource "google_storage_bucket_object" "archive" {
  name   = "scheduleinstance.zip"
  bucket = google_storage_bucket.bucket.name
  source = "./scheduleinstance.zip"
}

resource "google_cloudfunctions_function" "startInstancePubSub" {
  name    = "startInstancePubSub"
  runtime = var.runtime

  source_archive_bucket = google_storage_bucket.bucket.name
  source_archive_object = google_storage_bucket_object.archive.name
  event_trigger {
    event_type = "providers/cloud.pubsub/eventTypes/topic.publish"
    resource   = var.start_topic
  }
}

resource "google_cloudfunctions_function" "stopInstancePubSub" {
  name    = "stopInstancePubSub"
  runtime = var.runtime

  source_archive_bucket = google_storage_bucket.bucket.name
  source_archive_object = google_storage_bucket_object.archive.name
  event_trigger {
    event_type = "providers/cloud.pubsub/eventTypes/topic.publish"
    resource   = var.stop_topic
  }
}

resource "google_cloud_scheduler_job" "startup" {
  name      = "startup"
  schedule  = "0 12 * * *"
  time_zone = var.time_zone

  pubsub_target {
    # topic.id is the topic's full resource name.
    topic_name = google_pubsub_topic.start-instance-event.id
    data       = base64encode("{\"zone\":\"asia-northeast1-c\",\"label\":\"env=tweet\"}")
  }
}

resource "google_cloud_scheduler_job" "shutdown" {
  name      = "shutdown"
  schedule  = "0 0 * * *"
  time_zone = var.time_zone

  pubsub_target {
    # topic.id is the topic's full resource name.
    topic_name = google_pubsub_topic.stop-instance-event.id
    data       = base64encode("{\"zone\":\"asia-northeast1-c\",\"label\":\"env=tweet\"}")
  }
}
