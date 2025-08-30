const connectDB = require("./config/db.config");
const port = 3000;

connectDB();
const express = require("express");
const app = express();
const movieRouter = require("./routers/movie.router");

const cors = require("cors");
app.use(cors());


app.use("/images", express.static("./images"));
app.use("/api", movieRouter);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})