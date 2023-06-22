FROM node:16.14.2-alpine AS NPM_TOOL_CHAIN

WORKDIR /usr/app

ENV PATH /usr/app/node_modules/.bin:$PATH

COPY . .
RUN npm i

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/index.js" ]