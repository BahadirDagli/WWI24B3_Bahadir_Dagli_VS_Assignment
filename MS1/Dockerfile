FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm rebuild sqlite3 --build-from-source

CMD ["node", "src/server.js"]