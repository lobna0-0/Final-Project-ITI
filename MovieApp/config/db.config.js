const mongoose = require("mongoose");

const connect = async () => {
  mongoose.connect(
    "mongodb://alabib55565:qPU1uiN5cm5Hev6d@ac-jihknl1-shard-00-00.ubt4iw7.mongodb.net:27017,ac-jihknl1-shard-00-01.ubt4iw7.mongodb.net:27017,ac-jihknl1-shard-00-02.ubt4iw7.mongodb.net:27017/?replicaSet=atlas-owx8xj-shard-0&ssl=true&authSource=admin"
  );
};

module.exports = connect;
