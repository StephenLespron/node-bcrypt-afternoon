require("dotenv").config();
const express = require("express"),
  session = require("express-session"),
  massive = require("massive"),
  authCtrl = require("./controllers/authController"),
  treasureCtrl = require("./controllers/treasureController"),
  auth = require("./middleware/authMiddleware"),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
  app = express();

app.use(express.json());

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
  })
);

//Authorize Users Endpoints
app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.get("/auth/logout", authCtrl.logout);

//Treasure Endpoints
app.get(`/api/treasure/dragon`, treasureCtrl.dragonTreasure);
app.get(`/api/treasure/user`, auth.userOnly, treasureCtrl.getUserTreasure);
app.post(`/api/treasure/user`, auth.userOnly, treasureCtrl.addUserTreasure);
app.get(
  `/api/treasure/all`,
  auth.userOnly,
  auth.adminOnly,
  treasureCtrl.getAllTreasure
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("DB running");
  app.listen(SERVER_PORT, () => console.log(`through port: ${SERVER_PORT}`));
});
