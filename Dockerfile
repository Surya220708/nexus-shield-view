# Use Node.js latest alpine image as the base image for the build stage
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json to the working directory
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the remaining application source code
COPY . .

# Build the Vite React application for production
RUN npm run build

# Use Nginx lightweight image for serving static files
FROM nginx:alpine

# Copy the built assets from the builder stage to Nginx's default public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to the host
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
