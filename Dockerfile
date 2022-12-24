FROM node:16.15.1-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

COPY ./dist ./dist

CMD ['yarn', 'start:dev']
