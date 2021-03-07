
NATIVE_DIR = IndraReactNative
WEB_DIR = IndraReactWeb
COMMON_DIR = IndraReactCommon

native:
	cd $(NATIVE_DIR); make prod

web:
	cd $(WEB_DIR); make prod

start:
	expo start

upload:
	expo publish

dev_env:
	# set up developer environment!
	# need to have npm installed!
	npm -v
	npm install
	npm install expo-cli --global
	npm install --save-dev jest


