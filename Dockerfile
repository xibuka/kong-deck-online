FROM --platform=linux/amd64 node:18-slim

# 设置工作目录
WORKDIR /app

# 安装必要的软件包
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# 安装deck
RUN curl -sL https://github.com/kong/deck/releases/download/v1.44.2/deck_1.44.2_linux_amd64.tar.gz -o deck.tar.gz \
    && tar -xf deck.tar.gz \
    && mv deck /usr/local/bin/ \
    && rm deck.tar.gz

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制其他应用文件
COPY . .

# 暴露端口
EXPOSE 80

# 设置环境变量
ENV PORT=80

# 启动应用
CMD ["npm", "start"]