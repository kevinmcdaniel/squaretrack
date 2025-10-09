
FROM node:22-alpine

RUN mkdir /app
WORKDIR /app

COPY be/package.json be/package-lock.json be/tsconfig.json be/src ./

RUN npm install

# RUN npx prisma generate --schema=./src/model

CMD ["npm", "run", "dev"]
