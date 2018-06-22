FROM node:10-alpine
ARG NODE_ENV=development
RUN mkdir /app
WORKDIR /app
RUN yarn
RUN yarn bootstrap
