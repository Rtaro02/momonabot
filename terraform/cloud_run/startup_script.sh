#! /bin/bash
cat <<EOF > /etc/cron.d/cron
// Retweet
* * * * * root curl -H "Authorization: Bearer '$(gcloud auth print-identity-token)'" ${cloud_run}/retweet
EOF