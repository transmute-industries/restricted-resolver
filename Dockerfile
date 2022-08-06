FROM node:18

USER node
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node server.js ./

RUN npm ci --only=production

EXPOSE 8080
CMD [ "node", "server.js" ]