FROM my_node_image
WORKDIR mkdir /code
COPY . .
EXPOSE 4000
CMD node index.js
