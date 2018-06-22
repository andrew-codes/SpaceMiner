FROM node:10-alpine
ARG APP=web

EXPOSE 80

RUN mkdir -p /app/build
COPY . /app/build
WORKDIR /app/build
RUN yarn && yarn bootstrap
RUN NODE_ENV=production yarn build

RUN mkdir -p /app/dist/apps
RUN cp -r /app/build/apps/${APP} /app/dist/apps
RUN cp -r /app/build/packages /app/dist
RUN cp -r /app/build/build /app/dist/build
RUN cp /app/build/package.json /app/dist
RUN cp /app/build/yarn.lock /app/dist
RUN cp /app/build/lerna.json /app/dist/lerna.json

RUN rm -rf /app/build

WORKDIR /app/dist
RUN NODE_ENV=production yarn
RUN NODE_ENV=production yarn bootstrap
RUN rm -rf /app/dist/build

WORKDIR /app/dist/apps/${APP}
ENV NODE_ENV=production
ENV API_PORT=80
ENV WEB_PORT=80
CMD ["yarn", "start"]
