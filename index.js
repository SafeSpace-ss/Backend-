const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const { API_PORT , NODE_ENV } = process.env;
const port = process.env.PORT || API_PORT;

// server listening 
server.listen(port, () => {
  console.log(`Server running in ${NODE_ENV} stage, on port ${port}`);
});