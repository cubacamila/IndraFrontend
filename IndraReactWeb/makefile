JSLINT = ./node_modules/.bin/eslint --fix
JSFILES = src

prod: tests
	# put here what we need to do to build prod version
	npm run build
	- git commit -a
	git push origin master
	npm run deploy

tests: lint jstests

install:
	npm install

lint:
	$(JSLINT) $(JSFILES)

jstests:
	./node_modules/.bin/cross-env CI=true npm test -- --coverage --watchAll=false
