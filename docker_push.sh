COMMIT_ID=`git log -n 1 --format=%h`
IMAGE_ID="gcr.io/momonabot/momonabot"
docker build -t ${IMAGE_ID}:${COMMIT_ID} .
docker push ${IMAGE_ID}":"${COMMIT_ID}
docker tag ${IMAGE_ID}":"${COMMIT_ID} ${IMAGE_ID}":latest"
docker push ${IMAGE_ID}":latest"