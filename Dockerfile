FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
COPY prisma/ ./prisma/

RUN yarn cache clean --all
RUN corepack enable && corepack prepare yarn@stable --activate
RUN yarn install

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN npx prisma generate


RUN npm run build

EXPOSE 5000
CMD ["sh", "-c", "npx prisma db push && npm run seed && node dist/src/main.js"]
