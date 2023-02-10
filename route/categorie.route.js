const express = require('express');
const router = express.Router();
const categorie= require("../models/categorie");
const scategorie= require("../models/scategorie")
// afficher la liste des categories.
router.get('/liste', async (req, res,) => {
    try{
        const cat =await categorie.find()
        res.status(200).json(cat)

    }
    catch (error){
       res.status(404).json({message:error.message})


    }
});
// créer un nouvelle catégorie
router.post('/creat', async (req, res) => {
const{nomcategorie,imagecategorie}=req.body
//const cat1=new categorie ({nomcategorie:nomcategorie,imagecategorie:imagecategorie})
//une 2 eme possibilité d'écriture 
const cat1=new categorie(req.body)
try{
    await  cat1.save();
    res.status(200).json(cat1)
}
catch (error){
      res.status(404).json({message:error.message})
}
});
// chercher une catégorie

    router.get('/:categorieId',async(req, res)=>{
        try {
        const cat = await categorie.findById(req.params.categorieId);
        res.status(200).json(cat);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
        });

// modifier une catégorie

    router.put('/:categorieId', async (req, res)=> {
        const { nomcategorie, imagecategorie} = req.body;
        const id = req.params.categorieId;
        try {
        const cat1 = {
        nomcategorie:nomcategorie,imagecategorie:imagecategorie, _id:id };
        console.log(cat1)
        await categorie.findByIdAndUpdate(id, cat1);
        res.json(cat1);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
        });


// Supprimer une catégorie
// router.delete('/:categorieId', async (req, res) => {
//     const id = req.params.categorieId;
//     try {
//         // trouver la catégorie associée et ses sous-catégories
//         const categorieFound = await categorie.findById(id).populate("scategorie");
//         // supprimer les sous-catégories associées
//         categorieFound.scategories.forEach(async scategorie => {
//             await scategorie.remove();
//         });
//         // supprimer la catégorie
//         await categorieFound.remove();
//         res.json({ message: "categorie et ses sous-catégories ont été supprimées avec succès." });
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// });
// Supprimer une catégorie
router.delete('/:categorieId', async (req, res) => {
    const id = req.params.categorieId;
    await categorie.findByIdAndDelete(id);
    res.json({ message: "categorie deleted successfully." });
});



module.exports = router;