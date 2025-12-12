# Use a imagem base do Node.js 18 Alpine
FROM node:18-alpine AS base

# 1. Instalação de dependências (deps stage)
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# Usando --legacy-peer-deps para resolver o conflito com React 19
RUN   if [ -f package-lock.json ]; then npm ci --legacy-peer-deps;   else echo "package-lock.json not found. Using npm install." && npm install --legacy-peer-deps;   fi

# 2. Build da aplicação (builder stage)
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Simplificando: Usar npm run build
RUN npm run build

# 3. Imagem final (runner stage)
FROM base AS runner
WORKDIR /app

# Adiciona usuários e grupos para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia arquivos essenciais do build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/data ./data

# Define a porta de execução
ENV PORT 3000

# Define o usuário de execução
USER nextjs

# Comando de inicialização
CMD ["npm", "start"]