FROM node:16.13.2


WORKDIR /app


COPY package.json ./
COPY package-lock.json ./

RUN npm install

ENV NODE_OPTIONS="--max-old-space-size=4096"

COPY . ./

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]