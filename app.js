const config = require("config");

//framework
const Server = require("./framework/Application");

//routers
const authorization = require("./routes/auth");
const universities = require("./routes/universities");

//middlewares
const parserJSON = require("./framework/Parser");
const parsedURL = require("./framework/ParserUrl");

const PORT = process.env.PORT || config.port || 8080;

const app = new Server();

app.use(parserJSON);
app.use(parsedURL);

app.addRouter(authorization);
app.addRouter(universities);

app.listen(PORT, () => console.log(`Server Is Running At Port ${PORT}...`));
