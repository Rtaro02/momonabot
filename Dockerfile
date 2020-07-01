FROM ubuntu:20.04

# RUN timedatectl set-timezone Asia/Tokyo

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update
RUN apt-get install -y sudo
RUN apt-get install -y wget
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN apt-get install -y git
RUN apt-get install -y curl
RUN apt-get install -y vim

RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add - && \
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.2.list && \
    apt-get update
RUN apt-get install -y mongodb-org

RUN sudo npm install n -g && \
    sudo n stable && \
    sudo apt-get purge -y nodejs npm

RUN npm install twitter

RUN npm install puppeteer
RUN npm install puppeteer-core
RUN sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    apt update && \
    apt-get install -y google-chrome-stable
RUN npm install mocha -g
RUN npm install mongodb
COPY ./ /
#ENTRYPOINT [ "/bin/bash", "run.sh" ]
ENTRYPOINT [ "/bin/bash" ]