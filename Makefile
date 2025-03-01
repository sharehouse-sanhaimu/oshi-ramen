up:
	@echo "Starting Nextjs App..."
	@docker compose up -d
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

remove-branch:
	@echo "Removing branch..."
	@git remote prune origin
	@git branch | xargs git branch -d
	@echo "Branch removed"
