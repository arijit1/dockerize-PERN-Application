# #FROM node:alpine
# FROM node:12.18.2
# WORKDIR '/app'

# COPY package.json .
# RUN npm install
# COPY . .
# CMD ["npm","start"]

FROM node:14-alpine

WORKDIR /usr/src/fe/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["npm", "start"]