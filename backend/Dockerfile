# FROM node:12

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package*.json ./

# RUN npm install
# # If you are building your code for production
# # RUN npm ci --only=production

# # Bundle app source
# COPY . .

# EXPOSE 5001
# CMD [ "node", "index.js" ]

# stage 1 building the code
# FROM node as builder
# WORKDIR /usr/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# CMD [ "node", "index.js" ]

# # stage 2
# FROM node
# WORKDIR /usr/app
# COPY package*.json ./
# RUN npm install --production

# COPY --from=builder /usr/app/dist ./dist

# COPY ormconfig.docker.json ./ormconfig.json
# #COPY .env .

# EXPOSE 5001
# CMD node dist/src/index.js

FROM node:14-alpine

RUN mkdir -p /usr/src/be/app

WORKDIR /usr/src/be/app

COPY package.json .
COPY package-lock.json .
COPY index.js .

RUN npm install
#COPY ./wait-for-it.sh .

CMD ["npm", "start"]