FROM node:15-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --production

COPY ./  /app/
# ENV MONGODB_CONNECTION_STRING='mongodb+srv://twtDB:dRdLt6B9PGbw4cV4@my-wtmb.sqa0c.mongodb.net/my-wtmb?retryWrites=true&w=majority'

EXPOSE 3000
CMD [ "node", "/app/index.js" ]


