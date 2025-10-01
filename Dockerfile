# Multi-stage build for Node.js backend
FROM node:18-alpine AS backend

WORKDIR /app

# Copy backend package files
COPY package*.json ./
RUN npm install

# Copy backend source
COPY server ./server
COPY .env ./

EXPOSE 5000

CMD ["npm", "start"]
