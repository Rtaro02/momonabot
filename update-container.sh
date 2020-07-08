sudo docker build . -t post:latest
sudo docker run -it --rm --network tweet_mongo-network post:latest run_eline.sh
# sudo docker run -it --rm --network tweet_mongo-network post:latest
# sudo docker run -it --rm --network tweet_mongo-network post:latest run_other.sh
# sudo docker run -it --rm --network tweet_mongo-network post:latest run_tweet_with_image.sh