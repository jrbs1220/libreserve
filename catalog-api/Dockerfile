FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS test
RUN npm test

FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=base /app ./
EXPOSE 5000
HEALTHCHECK --interval=15s --timeout=3s CMD wget -qO- http://localhost:5000/health || exit 1
USER node
CMD ["node", "server.js"]
