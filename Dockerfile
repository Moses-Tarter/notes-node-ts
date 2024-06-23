FROM node:17

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g typescript

COPY . .

# Generate Prisma Client
RUN npx prisma generate

RUN npm run build

CMD ["node", "dist/app.js"]
