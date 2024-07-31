# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build TypeScript → JavaScript
RUN npm run build


# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled build from builder stage
COPY --from=builder /app/dist ./dist

# Expose API Gateway port
EXPOSE 3000

# Start the gateway
CMD ["node", "dist/server.js"]