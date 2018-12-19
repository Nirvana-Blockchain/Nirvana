FROM ubuntu:xenial

MAINTAINER Parvinder Singh Saluja <parvinder.singh@impetus.co.in>

RUN  apt-get update

RUN  apt-get -y install software-properties-common

RUN  add-apt-repository -y ppa:ethereum/ethereum

RUN  apt-get update

RUN  apt-get install -y ethereum

RUN  apt-get install -y build-essential golang



# RUN geth --rinkeby --rpc --rpcapi db,eth,net,web3,personal,admin --rpcport 8545 --rpcaddr "0.0.0.0" --datadir "./data" --rpccorsdomain "*"



RUN apt-get update && apt-get install -y git 


FROM node:latest


RUN mkdir /BAAS


COPY ./BAAS /BAAS

WORKDIR /BAAS

RUN npm install

EXPOSE 3001

CMD [ "npm", "start" ]



