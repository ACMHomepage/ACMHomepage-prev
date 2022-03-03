# Util variable
ROOT_DIR:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

# Configable variable
DB_NAME = acm-homepage.maria-db
DB_PORT = 3306
DB_ENTRY_POINT = $(ROOT_DIR)/db/entrypoint/

BUILD_FLAG_FILE = /tmp/ACMHomepage/Dockerfile_builded

# State variable
REBUILD = false

.PHONY: run
run: build
	@# If the container is already running but the makefile REBUILD variable is
	@# true, we also need run, but after we remove the original one.
	@if [ \
		$(REBUILD) == "true" \
		-a \
		"$$(docker ps -q -a -f name=$(DB_NAME))" \
	]; then \
		echo "Remove container $(DB_NAME)..."; \
		docker rm -f $(DB_NAME); \
	fi
	@# If the container is not running or even not existed, create a container.
	@if [ ! "$$(docker ps -q -f name=$(DB_NAME))" ]; then \
		if [ "$$(docker ps -aq -f status=exited -f name=$(DB_NAME))" ]; then \
			echo "Remove container $(DB_NAME)..."; \
			docker rm $(DB_NAME); \
		fi; \
		echo "Run container $(DB_NAME) on host port $(DB_PORT)..."; \
		docker run -d \
			-p $(DB_PORT):3306 \
			-v $(DB_ENTRY_POINT):/docker-entrypoint-initdb.d \
			--name $(DB_NAME) $(DB_NAME); \
	fi

.PHONY: remove
remove:
	@# We remove it, only if it is a existed container.
	@if [ "$$(docker ps -q -a -f name=$(DB_NAME))" ]; then \
		echo "Remove container $(DB_NAME)..."; \
		docker rm -f $(DB_NAME); \
	fi

.PHONY: build
build: $(BUILD_FLAG_FILE)

$(BUILD_FLAG_FILE): Dockerfile
	$(eval REBUILD = true)
	@echo "Build image $(DB_NAME)..."
	@docker build -t $(DB_NAME) .
	@mkdir -p $(dir $(BUILD_FLAG_FILE))
	@touch $(BUILD_FLAG_FILE)

