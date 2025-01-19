# Use a Node.js 18 image (supports structuredClone)
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . ./

# Build the React app
RUN npm run build

# Use an Nginx image to serve the static files
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .

# Expose the default Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
