# pull the base image
FROM node:lts-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./

RUN yarn

RUN yarn add axios

COPY . ./

RUN yarn build

# 포트 노출
EXPOSE 3000

# 앱 실행
CMD ["yarn", "start"]