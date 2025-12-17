# Stage 1: Build the Next.js application
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock package-lock.json* ./
RUN npm install --production=false

# Copy source code
COPY . .

# Build Next.js application
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV production

# Copy Next.js build output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Copy necessary files for the socket server (ts-node, socket-server.ts, tsconfig.json, src/lib)
# We need ts-node and typescript to run the socket-server.ts
RUN npm install -g ts-node typescript

# Copy source files for the socket server and API routes
COPY tsconfig.json ./
COPY socket-server.ts ./
COPY src/lib ./src/lib
COPY src/app/api ./src/app/api
COPY src/hooks ./src/hooks

# Expose the ports
EXPOSE 3000
EXPOSE 3001

# Command to run the Next.js application (used by the 'web' service)
CMD ["npm", "start"]