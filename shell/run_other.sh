willTweet=$1
for i in `seq 0 8`
do 
    node ../runner/run_other.js $i $willTweet
done