# reset minikube
# minikube delete;

# start minikube
minikube start --cpus 4;
minikube addons enable metrics-server;

# build the necessary images
echo "building flyway migration image..."
cd flyway;
minikube image build -t qa-database-migrations -f ./Dockerfile .;
cd ..;
echo "building qa api image..."
cd qa-api;
minikube image build -t qa-api -f ./Dockerfile.prod .;
cd ..;
echo "building llm api image..."
cd llm-api;
minikube image build -t llm-api -f ./Dockerfile .;
cd ..;
echo "building qa nginx image..."
cd nginx;
minikube image build -t qa-nginx -f ./Dockerfile.prod .;
cd ..;
echo "building qa ui image..."
cd qa-ui;
minikube image build -t qa-ui -f ./Dockerfile.prod .;
cd ..;

# start database
echo;
echo "Starting database";
minikube kubectl -- apply -f https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/release-1.19/releases/cnpg-1.19.1.yaml;

while true; do
  output=$(minikube kubectl -- get all -n cnpg-system)
  # echo;
  # echo "$output"
  
  if ! echo "$output" | grep -q "0/1"; then
    echo "$output"
    echo;
    break
  else
    echo "Waiting for plugin................"
    sleep 5
  fi
done

minikube kubectl -- apply -f kubernetes/qa-database-cluster.yaml;
while true; do
  output=$(minikube kubectl -- cnpg status qa-database-cluster)
  # echo;
  # echo "$output"
  
  if echo "$output" | grep -q "Cluster in healthy state"; then
    echo "$output"
    echo;
    break
  else
    echo "Waiting for database clusters................"
    sleep 5
  fi
done
echo "Starting migration";
minikube kubectl -- apply -f kubernetes/qa-database-migration-job.yaml;
while true; do
  output=$(minikube kubectl -- get pods)  
  # echo;
  # echo "$output"
  
  if echo "$output" | grep -q "Completed"; then
    echo "$output"
    echo;
    break
  else
    echo "Waiting for migrations................"
    sleep 5
  fi
done

# start app
minikube kubectl -- apply -f kubernetes/qa-api-deployment.yaml;
minikube kubectl -- apply -f kubernetes/qa-api-deployment-hpa.yaml;

minikube kubectl -- apply -f kubernetes/llm-api-deployment.yaml;
minikube kubectl -- apply -f kubernetes/llm-api-deployment-hpa.yaml;

minikube kubectl -- apply -f kubernetes/qa-ui-deployment.yaml;
minikube kubectl -- apply -f kubernetes/qa-ui-deployment-hpa.yaml;

minikube kubectl --  get hpa;
echo;
minikube kubectl --  get pods;
echo;
# while true; do
#   output=$(minikube kubectl --  top pods)  
#   # echo;
#   # echo "$output"
  
#   if ! echo "$output" | grep -q "error: metrics not available yet"; then
#     echo "$output"
#     echo;
#     break
#   else
#     echo "Waiting for metrics................"
#     sleep 5
#   fi
# done

# expose app
minikube kubectl -- apply -f kubernetes/qa-api-service.yaml;
minikube kubectl -- apply -f kubernetes/llm-api-service.yaml;
minikube kubectl -- apply -f kubernetes/qa-ui-service.yaml;

# curl $(minikube service qa-api --url);
# echo;
# curl $(minikube service llm-api --url);
# echo;
# curl $(minikube service qa-ui --url);
# echo;

# prepare nginx
minikube kubectl -- apply -f kubernetes/qa-nginx-deployment.yaml;
minikube kubectl -- apply -f kubernetes/qa-nginx-deployment-hpa.yaml;
minikube kubectl -- apply -f kubernetes/qa-nginx-service.yaml;

minikube kubectl --  get services;
echo;
minikube kubectl --  get pods;
echo;

curl $(minikube service qa-nginx --url)/api/;
echo;
# curl $(minikube service qa-nginx --url)/;
echo "Open the website at: $(minikube service qa-nginx --url)";
