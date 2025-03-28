# Specify Node Version and Image
FROM node:22.13.1 AS development

# Specify the working dir
WORKDIR /andrei/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli@18.2.0

COPY . .

RUN npm run build

EXPOSE 4200
