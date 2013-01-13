ifeq "" "$(shell which npm)"
default:
	@echo "Please install node.js and npm"
	@echo "Visit http://nodejs.org/ for node.js"
	@echo "Visit http://npmjs.org/ for npm"
	exit 1
else
default: test package
endif

node_modules: package.json
	npm install
	@touch $@

external:
	mkdir -p external

deps/require.js:
	mkdir -p deps
	cd deps && \
		wget http://requirejs.org/docs/release/2.0.4/minified/require.js
	touch $@

external/require.js: external deps/require.js
	cp deps/require.js external/ && touch $@

download_deps: external/require.js

build: node_modules
	@./node_modules/jshint/bin/hint lib/*.js --config jshint.config
	@./node_modules/jshint/bin/hint tests/*.js --config jshint.config

test: build
	@node runner.js

dist/garoa:
	@mkdir -p dist/garoa

package: dist/garoa
	@cp lib/* dist/garoa
	@cp images/* dist/garoa
	@cd dist && zip garoa.zip garoa/* > /dev/null

report:
	@node junit.js

clean:
	@rm -rf node_modules
	@rm -rf external
	@rm -rf reports
	@rm -rf dist

run: node_modules download_deps
	./node_modules/.bin/supervisor ./app.js

ghpages: deploy download_deps
	rm -rf /tmp/ghpages
	mkdir -p /tmp/ghpages
	cp -Rv static/* /tmp/ghpages
	cp -Rv external/* /tmp/ghpages
	cp -Rv lib/*.js /tmp/ghpages

	cd /tmp/ghpages && \
		git init && \
		git add . && \
		git commit -q -m "Automatic gh-pages"
	cd /tmp/ghpages && \
		git remote add remote git@github.com:gutomaia/nodeNES.git && \
		git push --force remote +master:gh-pages
	rm -rf /tmp/ghpages

.PHONY: clean run report ghpages download_deps
