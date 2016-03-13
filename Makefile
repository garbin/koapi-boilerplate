BIN = node
BABEL = ./node_modules/.bin/babel-node
MOCHA_REQUIRED = --require should --require should-http
KNEXFILE = ./knexfile.js

COVER_PORT = $(shell echo $$COVER_PORT)
ifeq ($(strip $(COVER_PORT)),)
	COVER_PORT = 4003
endif

DOCS_PORT = $(shell echo $$DOCS_PORT)
ifeq ($(strip $(DOCS_PORT)),)
	DOCS_PORT = 4004
endif

TESTS = test/routers \
				test/units

test:
	@NODE_ENV=test $(BIN) \
		./node_modules/.bin/mocha \
		$(MOCHA_REQUIRED) \
		$(TESTS) \
		--bail

test-cover:
	@NODE_ENV=test $(BIN) \
		./node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		-- \
		$(MOCHA_REQUIRED) \
		$(TESTS) \
		--bail

cover-server:
	 ./node_modules/.bin/http-server ./coverage -p $(COVER_PORT)

apidoc-server:
	 ./node_modules/.bin/http-server ./docs -p $(DOCS_PORT)

.PHONY: test bench
