# Use a imagem base oficial do Node.js 18 Alpine
FROM node:18-alpine AS base

# Instala dependências necessárias para o build
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copia arquivos de configuração do package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# Instala dependências com legacy-peer-deps para evitar conflitos
RUN npm ci --legacy-peer-deps

# Constrói a aplicação
FROM base AS builder
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .

# Gera o build da aplicação Next.js
RUN npm run build

# Imagem de produção
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Cria um usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia o build gerado
COPY --from=builder /app/public ./public
# CORREÇÃO: Copiando node_modules da etapa 'base' (onde foram instalados)
COPY --from=base /app/node_modules ./node_modules
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Define o usuário e expõe a porta
USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Comando para iniciar a aplicação
CMD ["node", "server.js"]