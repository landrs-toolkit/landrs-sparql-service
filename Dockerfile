FROM node:lts-alpine

WORKDIR /app
COPY . .

# Uncomment the line below if you need to install native dependencies
#RUN apk add --no-cache make gcc g++ python

RUN npm ci --prod

CMD ["node", "app.js"]
