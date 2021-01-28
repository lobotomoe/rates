FROM node:14-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
COPY .env.example ./.env
USER node
RUN yarn install
COPY --chown=node:node . .
EXPOSE 1337 8080
RUN yarn build-ts
WORKDIR /home/node/app/dist
CMD [ "node", "app.js" ]