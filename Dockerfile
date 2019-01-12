FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

RUN yarn build

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]