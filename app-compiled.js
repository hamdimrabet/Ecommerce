"use strict";

var express = require('express');
var mongoose = require("mongoose");
var dotenv = require('dotenv');
var categorieRouter = require("./route/categorie.route"); //Page7
var scategorieRouter = require("./route/scategorie.route"); //Page7
var articleRouter = require("./route/article.route");
dotenv.config();
var app = express();
//BodyParser Middleware
app.use(express.json()); // pour comprendre req .body

mongoose.set("strictQuery", false);
// Connexion à la base données
mongoose.connect(process.env.DATABASECLOUD1, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  console.log("Connexion à la base de données réussie");
})["catch"](function (err) {
  console.log('Impossible de se connecter à la base de données', err);
  process.exit();
});
app.get("/", function (req, res) {
  res.send("Bonjour");
});
app.use('/api/categorie', categorieRouter); //1ére etape ppour trouvez l'url il va rechrehcer dans categorieRouter 
// ou on a declarer categorieRouter si il trouvez il va rechercher dans model categorie la methode corespondant 'get' ou post ou 'delete'

app.use('/api/scategorie', scategorieRouter);
app.use('/api/article', articleRouter);
app.listen(process.env.PORT, function () {
  console.log("serveur is listennig on port ".concat(process.env.PORT));
});
