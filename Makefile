dist: 

	rake clean
	rake dist

pull:

	git checkout master; git pull origin master
	cd app/submodules/th-client-core; git checkout master; git pull origin master;git checkout master; cd ../../..;\
	cd app/submodules/th-client-views; git checkout master; git pull origin master;git checkout master; cd ../../..;\

pull-th:

	cd app/submodules/data; git checkout th; git pull origin th; cd ../../..;\
	cd app/submodules/ember.js; git checkout th; git pull origin th; cd ../../..;\
	cd app/submodules/ember-touch; git checkout th; git pull origin th; cd ../../..;\

PORT ?= 8080


server:

	rm -rf tmp/* source/*
	bundle exec rackup -p $(PORT)


deploy:

	rm -f ./source/*tmp.*
	rm -rf $(TH_IOS_PATH)/www/*
	cat ./index.html | grep -v DEBUG_ONLY > $(TH_IOS_PATH)/www/index.html
	cp -pr ./source $(TH_IOS_PATH)/www/


deploy-android:

	rm -f ./source/*tmp.*
	rm -rf $(TH_ANDROID_PATH)/www/*
	cat ./index.html | grep -v DEBUG_ONLY > $(TH_ANDROID_PATH)/www/index.html
	cp -pr ./source $(TH_ANDROID_PATH)/www/



dist-deploy: dist deploy


dist-deploy-android: dist deploy-android

.PHONY: server dist
