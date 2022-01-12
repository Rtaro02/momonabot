#! /bin/bash
timedatectl set-timezone Asia/Tokyo
service cron restart
cat <<'EOF' > /etc/cron.d/cron
${ameba_other_cron_1} root curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" ${ameba_other_url}
${ameba_other_cron_2} root curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" ${ameba_other_url}
${ameba_past_cron_2016} root curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" ${ameba_past_url_2016}
${ameba_past_cron_2017} root curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" ${ameba_past_url_2017}
${ameba_past_cron_2018} root curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" ${ameba_past_url_2018}
${ameba_past_cron_2019} root curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" ${ameba_past_url_2019}
${ameba_past_cron_2020} root curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" ${ameba_past_url_2020}
${ameba_past_cron_2021} root curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" ${ameba_past_url_2021}
${ameba_past_cron_2022} root curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" ${ameba_past_url_2022}
${ameba_past_cron_2023} root curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" ${ameba_past_url_2023}
${ameba_past_cron_2024} root curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" ${ameba_past_url_2024}
${ameba_past_cron_2025} root curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" ${ameba_past_url_2025}
${eline_cron} root curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" ${eline_url}
${retweet_cron} root curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" ${retweet_url}

EOF
