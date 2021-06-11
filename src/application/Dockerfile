FROM node:14-alpine as base

WORKDIR /app
COPY ./package.json ./
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm install yarn
RUN yarn install --frozen-lockfile
COPY . .
RUN chown -R node:node /app
EXPOSE 3000
CMD ["yarn", "run", "start"]