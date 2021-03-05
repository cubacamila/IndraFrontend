
NATIVE_DIR = IndraReactNative
WEB_DIR = IndraReactWeb
COMMON_DIR = IndraReactCommon

native:
	cd $(NATIVE_DIR); make prod

web:
	cd $(WEB_DIR); make prod

expo:
	expo publish

dev_env:
	# set up developer environment!
	npm install expo-cli --global
	npm install --save-dev jest
