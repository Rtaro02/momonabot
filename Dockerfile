FROM alpine:3.12.1

RUN apk update
RUN apk add chromium \
            nss \
            freetype \
            freetype-dev \
            harfbuzz \
            ca-certificates \
            ttf-freefont \
            nodejs \
            npm \
            curl

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY . .
RUN npm install

ENTRYPOINT [ "node" ]
CMD [ "./index.js" ]