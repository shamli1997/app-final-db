#!/bin/bash

sudo npm install

if [ $(sudo docker container ls -q --filter name=my_app_backend_container) != '' ];then
sudo docker container stop my_app_backend_container
sudo docker container rm my_app_backend_container
fi

if [ $(sudo docker image ls -q --filter reference=my_app_backend) != '' ];then
sudo docker image rm my_app_backend
fi

sudo docker build . -t my_app_backend
sudo docker run -itd -p 5555:4000 --name my_app_backend_container my_app_backend