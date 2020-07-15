const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use("/api/v1/users", require("./api/v1/users"));
app.use("/api/v1/memory-cards", require("./api/v1/memory-cards"));

const port = process.env.PORT || 3045;
app.listen(port, () =>
   console.log(`server running at https://localHost:${port}`)
);
