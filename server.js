const express = require("express");
const app = express();

app.use("/api/v1/users", require("./api/v1/users"));

const port = process.env.PORT || 3045;
app.listen(port, () =>
   console.log(`server running at https://localHost:${port}`)
);
