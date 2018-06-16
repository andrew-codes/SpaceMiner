FROM node:10-alpine

EXPOSE 80

RUN mkdir -p /app

# Build
COPY . /app
WORKDIR /app
RUN yarn && yarn bootstrap
RUN NODE_ENV=production yarn build

# Prepare production deployment
RUN find . -type d -name "node_modules" -delete

# Production install
RUN NODE_ENV=production yarn

WORKDIR /app/apps/api
ENV NODE_ENV=production
ENV API_PORT=80
CMD ["yarn", "start"]
