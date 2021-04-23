const express = require("express");
const PORT = process.env.PORT || 9500;
const server = require("./api/server");

server.use("/", (req, res) => {
  res.send(`********** MATRIX BASE URL ON PORT ${PORT} **********`);
});

server.listen(PORT, () => {
  console.log(`<~~~~~ MATRIX LISTENING ON ${PORT} ~ ~~~~~>`);
});
