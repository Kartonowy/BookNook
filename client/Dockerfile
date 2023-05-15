FROM node:20-alpine3.16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm config set proxy http://backend:5000

CMD [ "npm", "start" ]