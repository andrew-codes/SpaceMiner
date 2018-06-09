FROM keymetrics/pm2:8-alpine

RUN mkdir -p /app/build
RUN mkdir -p /app/artifacts
RUN mkdir -p /app/deployment

# Build
COPY . /app/build
WORKDIR /app/build
RUN yarn && yarn bootstrap
RUN NODE_ENV=production yarn build:web
RUN cp -r /app/build/apps/web/dist /app/artifacts
RUN rm -rf /app/build

# Prepare production deployment
COPY . /app/deployment
RUN cp -r /app/artifacts/dist /app/deployment/apps/web

WORKDIR /app/deployment

# Production install
RUN NODE_ENV=production yarn

WORKDIR /app/deployment/apps/web
ENTRYPOINT [ "pm2-runtime", "start", "pm2.json", "--env", "production" ]
