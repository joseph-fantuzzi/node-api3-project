// require your server and launch it

const server = require("./api/server");

const port = 9000;

server.listen(port, () => {
  console.log(`server running on port ${port}.`);
});
