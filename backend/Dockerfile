FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm link cross-env
COPY . .
COPY ./dist ./dist

CMD ["npm", "run", "build"]