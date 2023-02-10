const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const categorieRouter =require("./route/categorie.route");  //Page7
const scategorieRouter =require("./route/scategorie.route");  //Page7
const articleRouter =require("./route/article.route")

dotenv.config()
const app = express();
//BodyParser Middleware
app.use(express.json());        // pour comprendre req .body

mongoose.set("strictQuery", false);
// Connexion à la base données
mongoose.connect(process.env.DATABASECLOUD1, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connexion à la base de données réussie");
    }).catch(err => {
        console.log('Impossible de se connecter à la base de données', err);
        process.exit();
    });
app.get("/", (req, res) => {
    res.send("Bonjour");
});
app.use('/api/categorie',categorieRouter); //1ére etape ppour trouvez l'url il va rechrehcer dans categorieRouter 
// ou on a declarer categorieRouter si il trouvez il va rechercher dans model categorie la methode corespondant 'get' ou post ou 'delete'

app.use('/api/scategorie',scategorieRouter);
app.use('/api/article', articleRouter);
app.listen(process.env.PORT,()=>{
    console.log(`serveur is listennig on port ${process.env.PORT}`);

});