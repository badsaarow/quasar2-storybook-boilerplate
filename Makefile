.PHONY: help
help:
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@echo "  help           Display this help message"
	@echo "  prepare        Install npm dependencies"
	@echo "  dev            Launche hot-reload frontend"
	@echo "  lint           lint sources"
	@echo "  test           Unit test"
	@echo "  build          Build Frontend"
	@echo "  clean          Delete all working files"

.PHONY: prepare
prepare:
	yarn

.PHONY: lint
lint:
	yarn run lint

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
