FROM node:22.13.1 AS development

# Specify the working dir
WORKDIR /andrei/src/app

COPY package*.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm ci
RUN npm run build

EXPOSE 3000

FROM node:22.13.1 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /andrei/src/app

COPY --from=development /andrei/src/app/ .

EXPOSE 3000

CMD ["node", "dist/main" ]
