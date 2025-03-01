up:
	@echo "Starting Nextjs App..."
	@docker compose up -d
	@echo "Nextjs App: http://localhost:3000"

up-view:
	@echo "Starting Nextjs App..."
	@docker compose up -d view
	@echo "Nextjs App: http://localhost:3000"

down:
	@echo "Stopping Nextjs App..."
	@docker compose down
	@echo "Nextjs App stopped"

restart:
	@echo "Restarting Nextjs App..."
	@docker compose down
	@docker compose up -d
	@echo "Nextjs App: http://localhost:3000"

logs-view:
	@echo "Viewing Nextjs App logs..."
	@docker compose logs -f view

remove-branch:
	@echo "Removing branch..."
	@git remote prune origin
	@git branch | xargs git branch -d
	@echo "Branch removed"

format:
	@echo "Formatting code..."
	@docker compose exec -it view pnpm run format
	@echo "Code formatted"