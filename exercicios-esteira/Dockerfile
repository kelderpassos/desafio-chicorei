FROM node:16.14-alpine

WORKDIR /api

COPY package*.json ./

RUN ["npm", "i"]

COPY . .

EXPOSE 3333

RUN npx tsc

CMD ["npm", "run", "dev"]