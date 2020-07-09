provider "google" {
    credentials = file("~/.gcp/terraform-credential.json")
    project = var.gcp_project
    region = "asia-northeast1"
    zone = "asia-northeast1-c"
}

resource "google_compute_instance" "vm_instance" {
    name = "momonabot"
    machine_type = "n1-standard-1"

    boot_disk {
        initialize_params {
            size = 10
            type = "pd-standard"
            image = "debian-cloud/debian-10"
        }
    }
    network_interface {
        network = "default"
        access_config {
        }
    }
    metadata_startup_script = "sudo apt-get install -y git && git clone https://github.com/Rtaro02/docker-installer.git && bash docker-installer/install.sh"
}