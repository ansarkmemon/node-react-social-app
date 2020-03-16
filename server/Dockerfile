FROM node:10.15.0

WORKDIR /app
RUN npm i -g nodemon 

COPY package*.json ./
COPY . .
RUN npm i

EXPOSE 3001
CMD ["npm", "run", "dev"]