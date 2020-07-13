docker build . -t post:latest
# docker run -it --rm --network momonabot_mongo-network post:latest
# docker run -it --rm --network momonabot_mongo-network post:latest ./shell/run.sh
# docker run -it --rm --network momonabot_mongo-network post:latest ./shell/run.sh
# docker run -it --rm --network momonabot_mongo-network post:latest ./shell/run_other.sh
# docker run -it --rm --network momonabot_mongo-network post:latest ./shell/run_tweet_with_image.sh
# docker run -it --rm --network momonabot_mongo-network post:latest ./shell/run_eline.sh
docker run -it --rm --network momonabot_mongo-network post:latest ./shell/run_hpfc.sh
