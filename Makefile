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
