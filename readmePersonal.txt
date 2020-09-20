for running node express.

create a folder
run -> npm init
then run npm i express pg cors
then create index.js file and write down the code
then install npm install -g nodemon.
then in package.json under script tag mention the  file that needs to be 
                    run with nodemon then in terminal run->  npm run serve

DOCKER COMMANDS :::
#docker run --name postgres-0 -e POSTGRES_PASSWORD=1234 -d -p 5432:5432 postgres
#docker exec -it postgres-0 bash
#psql --help
#psql -U postgres
#docker image ls
#docker ps
#docker rmi -f imageID