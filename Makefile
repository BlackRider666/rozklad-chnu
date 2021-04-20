install:
	cp api/.env.example api/.env
	docker-compose up -d --build
	docker exec -it api_rozklad bash -c 'composer install'
	docker exec -it api_rozklad bash -c 'composer dump-autoload'
	docker exec -it api_rozklad bash -c 'php artisan migrate --seed'
	docker exec -it api_rozklad bash -c 'php artisan storage:link'
	docker exec -it api_rozklad bash -c 'chmod -R 777 storage'
	docker exec -it api_rozklad bash -c 'php artisan key:generate'
up-d:
	COMPOSE_HTTP_TIMEOUT=300 docker-compose up -d --build

up:
	COMPOSE_HTTP_TIMEOUT=300 docker-compose up --build

down:
	docker-compose down

migrate:
	docker exec -it api_rozklad bash -c 'php artisan migrate'

composer-install:
	docker exec -it api_rozklad bash -c 'composer install'

update:
	docker exec -it api_rozklad bash -c 'composer install'
	docker exec -it api_rozklad bash -c 'composer dump-autoload'
	docker exec -it api_rozklad bash -c 'php artisan migrate'

console:
	docker exec -it api_rozklad bash

console-frontend:
	docker exec -it client_rozklad sh

console-nginx:
	docker exec -it nginx_rozklad sh

npm-ci:
	docker exec -it client_rozklad sh -c 'npm ci'

watch:
	docker exec -it client_rozklad sh -c 'npm run serve'

prod:
	docker exec -it client_rozklad sh -c 'npm run build'
