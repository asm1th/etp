# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:18-alpine As development
# Set the working directory to /app inside the container
WORKDIR /usr/src/app
# Copy app files
COPY . .
COPY ./dist ./dist
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 5011
# Start the app
CMD [ "npm", "run", "start" ]