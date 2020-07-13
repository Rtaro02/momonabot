willTweet=$1
for i in `seq 0 51`
do 
    node ../runner/run_other.js $i $willTweet
done