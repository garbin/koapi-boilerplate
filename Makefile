BIN = node
BABEL = ./node_modules/.bin/babel-node
MOCHA_REQUIRED = --require should --require should-http

TESTS = test/routers \
				test/units
test:
	@NODE_ENV=test $(BIN) \
		./node_modules/.bin/mocha \
		$(MOCHA_REQUIRED) \
		$(TESTS) \
		--bail

test-cov:
	@NODE_ENV=test $(BIN) \
		./node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha \
		-- \
		$(MOCHA_REQUIRED) \
		$(TESTS) \
		--bail

.PHONY: test bench
