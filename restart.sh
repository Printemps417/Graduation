docker stop $(docker ps -q)
docker rm $(docker ps -a -q)
git pull
./deploy.sh