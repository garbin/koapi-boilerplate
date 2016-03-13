BIN = node
MOCHA_OPTS = --require should --require should-http --compilers js:babel-core/register
# TESTS = test/http \
# 				test/units \
# 				test/experimental/index.js
TESTS = test/routers \
				test/units
test:
	@NODE_ENV=test $(BIN) \
		./node_modules/.bin/mocha \
		$(MOCHA_OPTS) \
		$(TESTS) \
		--bail

.PHONY: test bench
