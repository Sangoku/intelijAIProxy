# Dockerfile for api-proxy
FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY server.js ./
COPY .env ./

RUN apk add --no-cache gettext
RUN npm install --production
EXPOSE 3001
CMD ["node", "server.js"]
