FROM node:14

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE ${PORT}

CMD [ "npm", "start" ]

