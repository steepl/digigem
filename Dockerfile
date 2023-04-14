FROM node:lts as builder

WORKDIR /app

COPY . .

RUN npm install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

RUN npm run generate

RUN rm -rf node_modules && \
  NODE_ENV=production npm install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

EXPOSE 5000

ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 5000

CMD [ "npm", "run", "start" ]
