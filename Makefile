.PHONY: help

# self-documented Makefile
# https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'



MACHINE_ID := $(shell whoami)@$(shell uname -n)
GIT_SHA := $(shell git rev-parse --short HEAD)
TIMESTAMP := $(shell date "+%y%m%d_%H%M")
MACHINE_NAME := PC

# React-Native ENV variables
REACT_NATIVE_BUILD_NAME := $(TIMESTAMP)-$(GIT_SHA)-$(MACHINE_ID)
REACT_NATIVE_BUILD_ENV_NAME := $(MACHINE_NAME)
# one of: dev | beta | prod
RUN_ENV_NAME := dev

.EXPORT_ALL_VARIABLES:

### DEVELOPMENT PROCESS ##################
###################################

dev: export REACT_NATIVE_BUILD_ENV_NAME=localdev
dev: export RUN_ENV_NAME=devclient
dev: ## Start development environment
	expo start --dev-client


build-android-dev-client-eas: export RUN_ENV_NAME=devclient
build-android-dev-client-eas: ## build custom development client to the connected device/simulator
	eas build --platform android --profile dev-client

build-android-dev-apk-eas: export RUN_ENV_NAME=devapkeas
build-android-dev-apk-eas: ## Build Android .apk package (devapkeas)
	eas build --platform android --profile dev-apk

