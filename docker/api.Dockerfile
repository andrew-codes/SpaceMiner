FROM node:10-alpine

ARG NODE_ENV=production
EXPOSE 80

RUN mkdir -p /app

# Build
COPY . /app
WORKDIR /app

# Production install
RUN NODE_ENV=$NODE_ENV yarn

WORKDIR /app/apps/api
ENV NODE_ENV=$NODE_ENV
ENV API_PORT=80
CMD ["yarn", "start"]
