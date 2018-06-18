FROM node:10-alpine

ARG NODE_ENV=production
EXPOSE 80

RUN mkdir -p /app
VOLUME . /app

# Build
# COPY . /app
WORKDIR /app
RUN yarn && yarn bootstrap
ENV NODE_ENV=$NODE_ENV
ENTRYPOINT ["yarn", "build"]
