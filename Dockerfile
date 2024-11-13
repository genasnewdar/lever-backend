FROM node:16-buster

RUN mkdir /root/.aws
COPY .aws/* /root/.aws/

WORKDIR /app

COPY package*.json ./

RUN npm install -g ts-node nodemon && npm install

COPY . .

ENV TZ Asia/Singapore

ARG npm_config_cache
ENV npm_config_cache /app/npmcache

RUN apt-get update -y && apt-get install -y openssl

CMD ["npm", "run", "dev"]
