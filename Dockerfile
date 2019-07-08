FROM node:9

WORKDIR /app

COPY package*.json ./

RUN npm install && bower install --allow-root

COPY . .

CMD npm run build