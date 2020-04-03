FROM node:lts-alpine

WORKDIR /app
COPY . .

RUN apk add --no-cache make gcc g++ python

RUN npm ci --prod

CMD ["node", "app.js"]
