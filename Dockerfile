FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production

# Generate Prisma client
RUN npx prisma generate

# Copy app source
COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

# Start the application
CMD ["npm", "start"]