FROM node:14.15.1-alpine as builder

WORKDIR /home/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:14.15.1-alpine

ENV XUNTOS_AUTH_API_PORT 3000
EXPOSE 3000

WORKDIR /home/app

COPY --from=builder /home/app/dist/xuntos-auth.js .

ENTRYPOINT ["node", "/home/app/xuntos-auth.js"]
