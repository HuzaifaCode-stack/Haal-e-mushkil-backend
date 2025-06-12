const express = require("express");
require("dotenv").config();
const http = require("http");
const cors = require("cors");

const db = require("./database/db");

const app = express();
const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/v1/member", require("./routes/admin/member"));
app.use("/v1/listing", require("./routes/user/listing"));
app.use("/v1/gravience", require("./routes/user/gravience"));
app.use("/v1/admin/listing", require("./routes/admin/listing"));
app.use("/v1/volenteer", require("./routes/user/volenteer"));
app.use("/v1/register", require("./routes/admin/register"));

db();
const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server is running on port ${PORT} and connected to MongoDB`);
});
