FROM node:16-alpine3.15

# copy files
WORKDIR /multilayer_perceptron
COPY . .

# remove local node modules
RUN rm -rf /app/node_modules

# install dependencies
RUN npm install

ENTRYPOINT npm install && npm run dev -- --host --port ${PORT}