FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY .env.example ./
RUN npm install
COPY app ./app
COPY public ./public
CMD ["npm", "run", "dev", "--", "-p", "3100"]
