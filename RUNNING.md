TODO: The RUNNING.md outlines steps needed to run the application separately for the development mode and the production mode.

TODO: For merits, the RUNNING.md also outlines the steps needed to use Kubernetes to run the application with Minikube (or somilar), using kubernetes configuration files created as parts of the passing with merits requirements

# Dev mode

To run the application in dev mode, run `docker compose up --build`. Please build in order to create the right images. There is a ready to use script in `launch-dev-servers.sh`

# Prod mode

To run the application in dev mode, run `docker compose -f docker-compose.prod.yml up --build`. Please build in order to create the right images. There is a ready to use script in `launch-prod-servers.sh`

# Kubernetes and Minikube

The passages are long, but they are all aviable in a script in `launch-kubernetes.sh`. You can either launch the script or copy and paste single commands, with PWD as the main folder (not in the /kubernetes folder). To assure testing only this project without conflicts with others, please run `minikube delete` to reset all previous images and deployments.

The basic idea, we need six services: flyway, database, qa-api, qa-ui, llm-api, nginx.

For each one of them, we build and save the images, then we start 2 database clusters, run the flyway migrations, launch the three content services (qa-api, llm-api, qa-ui) by deploying them, configuring the horizzontal scaling up to 5, and creating the service.

Finally, we do the same with nginx and output a link to use. The configuration of nginx is the same as the one in the production docker compose, since we use the same services names as the hosts in docker compose. This allows us to use the same configuration for both.
