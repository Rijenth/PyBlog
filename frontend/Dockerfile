FROM node:latest as frontend

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

RUN yarn upgrade webpack

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]