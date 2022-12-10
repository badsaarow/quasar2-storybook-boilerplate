.PHONY: install
install:
	yarn run dev

.PHONY: dev
dev:
	yarn run dev

.PHONY: build
build:
	yarn run build

.PHONY: build.storybook
build.storybook:
	yarn run build:storybook

.PHONY: clean
clean:
	rm -rf node_modules dist storybook-static
