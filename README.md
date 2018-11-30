# Metallica Project

Pre-requistes :

1. Node, RabbitMQ, MongoDB should be installed
2. RabbitMQ, MongoDB should be up and running.
3. Google account for logging into the application

Installation guidelines :

1. Clone/download the Metallica project from repository

2. Open Command Prompt/Git Bash and navigate to the project folder (Metallica)

3. Use command 'npm install' to install the required node modules for the application

4. Commands for installing node modules for Micro services :

    1. client -> cd ./client && npm install
    2. google-oauth -> cd ./server/google-oauth && npm install
    3. api-gateway -> cd ./server/api-gateway && npm install    
    4. market-data-service -> cd ./server/market-data-service && npm install   
    5. notification-service -> cd ./server/notification-service && npm install
    6. trade-service -> cd ./server/trade-service && npm install
    7. ref-data-service -> cd ./server/ref-data-service && npm install
    

5. Running the application :

Navigate to project folder (Metallica) and use the command 'npm run start'

6. Running the Micro services :

Navigate to project folder (Metallica) and use the command 'npm run start-micro-services'



Application client is hosted @ localhost:3000

Service gateway is hosted @ localhost:8000

Trade Service is hosted @ localhost:8001

Ref Data Service is hosted @ localhost:8003

Market Data Service is hosted @ amqp://localhost

Notification Service is hosted @ localhost:8002

Authentication Service is hosted @ localhost:4000

