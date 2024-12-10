FROM node:18-alpine

ENV PORT=3000

COPY . /home/node/app 

WORKDIR /home/node/app

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]