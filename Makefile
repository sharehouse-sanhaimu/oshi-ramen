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
