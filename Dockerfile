# Стадия сборки
# Используем официальный образ Node.js для сборки
FROM node:18-alpine as build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Стадия запуска
# Используем легковесный Nginx для запуска приложения
FROM nginx:alpine

# Копируем собранные файлы из стадии сборки в Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфигурацию Nginx (если нужно)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]