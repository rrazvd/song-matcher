FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN apk update
RUN apk add
RUN apk add ffmpeg

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]