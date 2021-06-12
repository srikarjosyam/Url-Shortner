FROM node:14-alpine as base

WORKDIR /app
FROM base as production
ENV NODE_ENV=production
RUN npm install yarn
COPY ./package.json ./
COPY ./host/ ./host
RUN yarn install-all
COPY . .
RUN chown -R node:node /app
USER node

EXPOSE 3000
CMD ["yarn", "run", "start"]