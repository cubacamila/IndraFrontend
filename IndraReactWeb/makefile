JSLINT = ./node_modules/.bin/eslint --fix
JSFILES = src

# run tests and deploy the web app to Github Pages
prod: tests
	npm run deploy

tests: lint jstests

install:
	npm install

web:
	npm start

lint:
	$(JSLINT) $(JSFILES)

jstests:
	./node_modules/.bin/cross-env CI=true npm test -- --coverage --watchAll=false
