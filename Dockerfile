FROM keymetrics/pm2:8-alpine

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

ENTRYPOINT [ "pm2-runtime", "start", "pm2.json", "--env", "production" ]
