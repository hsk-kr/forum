FROM node:18 AS development

WORKDIR /backend

COPY ./package*.json ./

RUN npm install

COPY ./ .

ENV PORT=4000
ENV NODE_ENV=development
ENV CLIENT=http://localhost:4000

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]
