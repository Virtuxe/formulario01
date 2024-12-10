# Build stage
FROM node:18-alpine as builder
WORKDIR /app

# Clonar o repositório
RUN apk add --no-cache git
RUN git clone https://github.com/Virtuxe/formulario01.git .

# Instalar dependências
RUN npm install

# Build do projeto
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

# Configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
