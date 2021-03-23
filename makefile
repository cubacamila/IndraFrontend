
NATIVE_DIR = IndraReactNative
WEB_DIR = IndraReactWeb
COMMON_DIR = IndraReactCommon

native:
	cd $(NATIVE_DIR); make prod

web:
	cd $(WEB_DIR); make prod

start:
	cd $(NATIVE_DIR) && expo start

web_start:
	cd $(WEB_DIR) && make web

upload:
	cd $(NATIVE_DIR) && expo publish

dev_env_native:
	# set up developer environment!
	# need to have npm installed!
	# linux system might need sudo before command
	npm -v 
	cd $(NATIVE_DIR) && npm install
	npm install expo-cli --global
	npm install --save-dev jest

dev_env_web:
	# set up developer environment!
	# need to have npm installed!
	# linux system might need sudo before command
	npm -v git
	cd $(WEB_DIR) && npm install
	npm install eslint --save-dev

