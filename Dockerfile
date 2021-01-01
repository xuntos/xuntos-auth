FROM node:14.15.1-alpine as builder

WORKDIR /home/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:14.15.1-alpine

ENV XUNTOS_AUTH_API_PORT 3000
ENV XUNTOS_AUTH_I18N_LOCALES_DIRECTORY /home/app/locales
ENV XUNTOS_AUTH_TEMPLATES_DIRECTORY /home/app/templates
EXPOSE 3000

WORKDIR /home/app

COPY package.json .
COPY package-lock.json .

RUN npm install --only=prod

COPY --from=builder /home/app/dist/xuntos-auth.js .
COPY locales locales
COPY templates templates

ENTRYPOINT ["node", "/home/app/xuntos-auth.js"]
