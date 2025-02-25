1. Build and Run the Docker Container
   
Run the following commands to build and start your containers:

```
docker-compose up --build
```

To stop the containers:

```
docker-compose down
```

2. Test the API using Postman or curl

# Create a new resource
curl -X POST http://localhost:5000/api/resources -H "Content-Type: application/json" -d '{"name":"John Doe","description":"Senior"}'

# Get all resources
curl -X GET http://localhost:5000/api/resources

# Get all resources with some filters
curl -X GET http://localhost:5000/api/resources?keywords=Doe&page=1&limit=5&sortBy=name&order=desc

# Get resource by ID
curl -X GET http://localhost:5000/api/resources/{res_id}

# Update resource
curl -X PUT http://localhost:5000/api/resources/{res_id} -H "Content-Type: application/json" -d '{"name":"Updated Name","description":"Level Up"}'

# Delete resource
curl -X DELETE http://localhost:5000/api/resources/{res_id}
