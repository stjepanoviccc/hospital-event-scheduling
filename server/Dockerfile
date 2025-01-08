# build
FROM node:18.17-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# run
FROM node:18.17-alpine
WORKDIR /app
COPY --from=builder /app ./
RUN npm install
RUN apk add --no-cache \
    build-base \
    python3
RUN npm rebuild bcrypt --build-from-source
EXPOSE 3000
CMD ["npm", "start"]
