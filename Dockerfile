FROM node
WORKDIR mkdir /code
COPY . .
EXPOSE 4000
CMD node index.js
