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
RUN sudo npm install n -g && \
    sudo n stable && \
    sudo apt-get purge -y nodejs npm

RUN sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    apt update && \
    apt-get install -y google-chrome-stable
RUN npm install request
RUN npm install fs
RUN npm install puppeteer
RUN npm install puppeteer-core
RUN npm install twitter
RUN npm install -g mocha
RUN npm install chai
COPY ./ /
#ENTRYPOINT [ "/bin/bash", "run.sh" ]
ENTRYPOINT [ "/bin/bash" ]
