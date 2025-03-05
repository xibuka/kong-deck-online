# 构建阶段
FROM --platform=linux/amd64 node:18-slim AS builder

# 设置工作目录
WORKDIR /app

# 复制package.json
COPY package*.json ./

# 仅安装生产环境依赖
RUN npm ci --only=production

# 复制应用文件
COPY . .

# 生产阶段
FROM --platform=linux/amd64 node:18-slim

# 创建非root用户
RUN groupadd -r appuser && useradd -r -g appuser appuser

# 安装deck
RUN apt-get update && apt-get install -y curl \
    && curl -sL https://github.com/kong/deck/releases/download/v1.44.2/deck_1.44.2_linux_amd64.tar.gz -o deck.tar.gz \
    && tar -xf deck.tar.gz \
    && mv deck /usr/local/bin/ \
    && rm deck.tar.gz \
    && apt-get remove -y curl \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# 从构建阶段复制必要文件
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/server.js ./
COPY --from=builder /app/public ./public

# 设置目录权限
RUN chown -R appuser:appuser /app

# 切换到非root用户
USER appuser

# 设置环境变量和端口
ENV PORT=80
EXPOSE 80

# 启动应用
CMD ["npm", "start"]