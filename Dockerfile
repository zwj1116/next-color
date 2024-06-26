# FROM node:18.20.3
FROM nginx:1.20.1
# 设置工作目录  
WORKDIR /app  
  
# 将 package.json 和 package-lock.json 复制到工作目录中  
# COPY package*.json ./  
  
# 安装项目依赖  
# RUN npm install
  
# 将项目源代码复制到工作目录中  
# COPY . .  
  
# 构建项目（假设你的项目是一个 Vue CLI 创建的项目）  
# RUN yarn build

# RUN mkdir /usr/share/nginx/html/screen
# COPY screen/ /usr/share/nginx/html/screen

COPY ./dist /usr/share/nginx/html

#设置时区
RUN ln -snf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone

# RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf
# ADD nginx.conf /etc/nginx
EXPOSE 80  
CMD ["nginx", "-g", "daemon off;"]

# dockers stop --
# docker build -t vue .
# docker run -d -p 327:80 vue