
FROM node:24-alpine

RUN mkdir /app

WORKDIR /app

COPY be/package.json be/tsconfig.json be/prisma.config.ts be/src ./

RUN chown -R node:node /app

USER node

RUN npm install

# RUN npx prisma generate --schema=./src/model

CMD ["npm", "run", "dev"]
