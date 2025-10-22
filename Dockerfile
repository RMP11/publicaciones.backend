FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
COPY prisma/ ./prisma/

RUN yarn cache clean --all
RUN corepack enable && corepack prepare yarn@stable --activate
RUN yarn install

COPY . .

RUN npx prisma generate
RUN npx prisma db push


RUN npm run build

EXPOSE 5000
CMD ["node", "dist/src/main.js"]
