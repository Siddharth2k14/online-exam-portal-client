# Use an official Node.js runtime as a parent image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if any)
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm rebuild esbuild

# Copy rest of the frontend code
COPY . .

# Expose port (default Vite dev server port)
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]