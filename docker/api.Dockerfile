FROM keymetrics/pm2:8-alpine

EXPOSE 80

ARG NODE_ENV=production

RUN mkdir -p /app

# Build
COPY . /app
WORKDIR /app
RUN yarn && yarn bootstrap
RUN NODE_ENV=${NODE_ENV} yarn build

# Prepare production deployment
RUN find . -type d -name "node_modules" -delete

# Production install
RUN NODE_ENV=$NODE_ENV yarn

WORKDIR /app/apps/api
CMD ["pm2-runtime", "start", "pm2.json"]
