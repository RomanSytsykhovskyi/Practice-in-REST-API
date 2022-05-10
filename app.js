const config = require("config");
const http = require("http");

//framework
const Server = require("./framework/Application");

//routers
const authorization = require("./routes/auth");
const universities = require("./routes/universities");

//middlewares
const access = require("./framework/Access");
const bodyParser = require("./framework/bodyParser");
const parserJSON = require("./framework/Parser");
const parserURL = require("./framework/ParserUrl");

const PORT = process.env.PORT || config.port || 8080;

const app = new Server();

app.use(access);
app.use(bodyParser);
app.use(parserJSON);
app.use(parserURL);

app.addRouter(authorization);
app.addRouter(universities);

app.listen(PORT, () => console.log(`Server Is Running At Port ${PORT}...`));
