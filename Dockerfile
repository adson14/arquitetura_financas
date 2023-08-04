FROM node:18.17.0-alpine

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli@10.0.0

ENV DOCKERIZE_VERSION v0.7.0

RUN apk update --no-cache \
  && apk add --no-cache wget openssl \
  && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
  && apk del wget

USER node

WORKDIR /home/node/app

