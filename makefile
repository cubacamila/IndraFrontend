
NATIVE_DIR = IndraReactNative
WEB_DIR = IndraReactWeb
COMMON_DIR = IndraReactCommon

native:
	cd $(NATIVE_DIR); 

web:
	cd $(WEB_DIR); make prod

start:
	cd $(NATIVE_DIR);
	expo start;

upload:
	cd $(NATIVE_DIR);
	expo publish

dev_env:
	# set up developer environment!
	# need to have npm installed!
	cd $(NATIVE_DIR);
	npm -v;
	npm install;
	npm install expo-cli --global;
	npm install --save-dev jest;


