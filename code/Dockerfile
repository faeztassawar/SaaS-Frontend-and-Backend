# Use Node.js base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Generate prisma schema
RUN npx prisma generate

# Expose Next.js dev port
EXPOSE 3000

# Start the dev server
CMD ["npm", "run", "dev"]