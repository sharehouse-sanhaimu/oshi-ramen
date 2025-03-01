build:
	@echo "Building..."
	@docker compose build
	@echo "built successfully"

up:
	@echo "Starting Nextjs App..."
	@docker compose up -d
	@echo "Nextjs App: http://localhost:3000"

prod-up:
	@echo "Starting Nextjs App..."
	@docker compose -f compose.prod.yml up -d
	@echo "Nextjs App: http://localhost:3000"

down:
	@echo "Stopping Nextjs App..."
	@docker compose down
	@echo "Nextjs App stopped"

prod-down:
	@echo "Stopping Nextjs App..."
	@docker compose -f compose.prod.yml down
	@echo "Nextjs App stopped"

restart:
	@echo "Restarting Nextjs App..."
	@docker compose down
	@docker compose up -d
	@echo "Nextjs App: http://localhost:3000"

prod-restart:
	@echo "Restarting Nextjs App..."
	@docker compose -f compose.prod.yml down
	@docker compose -f compose.prod.yml up -d
	@echo "Nextjs App: http://localhost:3000"

logs-view:
	@echo "Viewing Nextjs App logs..."
	@docker compose logs -f view

logs-api:
	@echo "Viewing Nextjs App logs..."
	@docker compose logs -f api

logs-magazine:
	@echo "Viewing Nextjs App logs..."
	@docker compose logs -f magazine

remove-branch:
	@echo "Removing branch..."
	@git remote prune origin
	@git branch | xargs git branch -d
	@echo "Branch removed"

format:
	@echo "Formatting code..."
	@docker compose exec -it view pnpm run format
	@echo "Code formatted"
