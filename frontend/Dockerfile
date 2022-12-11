from node:19-alpine3.15 as frontend

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]