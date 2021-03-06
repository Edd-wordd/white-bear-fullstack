const express = require("express");
const app = express();
const path = require("path");

app.use("/api/v1/users", require("./api/v1/users"));
app.use("/api/v1/memory-cards", require("./api/v1/memory-cards"));

app.use(express.static("client/build"));
app.get("*", (req, res) => {
   res.sendFile(path.resolve(_dirname, "client", "build", "index.html"));
});
const port = process.env.PORT || 3045;
app.listen(port, () =>
   console.log(`server running at https://localHost:${port}`)
);
