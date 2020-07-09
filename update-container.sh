sudo docker build . -t post:latest
# sudo docker run -it --rm --network momonabot_mongo-network post:latest ./shell/run.sh $1
# sudo docker run -it --rm --network momonabot_mongo-network post:latest ./shell/run_other.sh $1
# sudo docker run -it --rm --network momonabot_mongo-network post:latest ./shell/run_tweet_with_image.sh $1
sudo docker run -it --rm --network momonabot_mongo-network post:latest ./shell/run_eline.sh $1