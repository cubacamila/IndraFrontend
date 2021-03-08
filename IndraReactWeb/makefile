REPO = indras_net
WEBAPP = $(REPO)/webapp

prod: test
	echo "Building web production system!"

setup_react:
	echo "Setup the react"
	cd $(REPO); make setup_react

local:
	echo "Building local web system!"
	cd $(WEBAPP); npm run start

test:
	echo "Running our tests!"
