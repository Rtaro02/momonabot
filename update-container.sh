sudo docker build . -t post:latest
sudo docker run -it --rm --network tweet_mongo-network post:latest