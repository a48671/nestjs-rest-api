FROM node:16.15.1-alpine as BUILD

WORKDIR usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --pure-lockfile

COPY . .

COPY ./dist ./dist

CMD ['yarn', 'start:dev']
