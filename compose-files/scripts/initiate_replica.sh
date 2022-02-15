#!/bin/bash

echo "Starting replica set initialize"
until mongo --host mongo1 --eval "print(\"waited for connection\")"
do
    sleep 2
done

until mongo --host mongo2 --eval "print(\"waited for connection\")"
do
    sleep 2
done

until mongo --host mongo3 --eval "print(\"waited for connection\")"
do
    sleep 2
done

echo "Connection finished"
echo "Creating replica set"
mongo --host mongo1 <<EOF
rs.initiate(
  {
    _id : 'rs0',
    members: [
      { _id : 0, host : "mongo1:27017", "priority": 4 },
      { _id : 1, host : "mongo2:27017", "priority": 2 },
      { _id : 2, host : "mongo3:27017", "priority": 1 }
    ]
  }
)
rs.reconfig(
  {
    _id : 'rs0',
    members: [
      { _id : 0, host : "mongo1:27017", "priority": 4 },
      { _id : 1, host : "mongo2:27017", "priority": 2 },
      { _id : 2, host : "mongo3:27017", "priority": 1 }
    ]
  },
  {
    "force" : true
  }  
)
EOF
echo "replica set created"

echo "Starting import data"

mongoimport --host rs0/mongo1,mongo2,mongo3 --db ocean --collection users --type json --file /initial-data/users.json --jsonArray

echo "Importing data finished"