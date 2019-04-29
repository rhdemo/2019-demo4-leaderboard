ENV_FILE := .env
include ${ENV_FILE}
export $(shell sed 's/=.*//' ${ENV_FILE})

# NOTE: the actual commands here have to be indented by TABs
build-background:
	./openshift/build.background.sh

build-backend:
	./openshift/build.backend.sh

build-frontend:
	./openshift/build.frontend.sh

build:
	./openshift/build.background.sh && ./openshift/build.backend.sh && ./openshift/build.frontend.sh


push-background:
	./openshift/push.background.sh

push-backend:
	./openshift/push.backend.sh

push-frontend:
	./openshift/push.frontend.sh

push:
	./openshift/push.background.sh && ./openshift/push.backend.sh && ./openshift/push.frontend.sh


deploy-background:
	./openshift/deploy.background.sh

deploy-backend:
	./openshift/deploy.backend.sh

deploy-frontend:
	./openshift/deploy.frontend.sh

deploy:
	./openshift/deploy.background.sh && ./openshift/deploy.backend.sh && ./openshift/deploy.frontend.sh


undeploy-background:
	./openshift/undeploy.background.sh

undeploy-backend:
	./openshift/undeploy.backend.sh

undeploy-frontend:
	./openshift/undeploy.frontend.sh

undeploy:
	./openshift/undeploy.background.sh && ./openshift/undeploy.backend.sh && ./openshift/undeploy.frontend.sh


