const express = require('express');
const router = express.Router();
const Pokemon = require('../../models/pokemon')
const validate = require('./validation/validatePokemon')
const auth = require('../../middleware/authorization')

/* Authorization */
// router.get('/', (req, res, next)=>{
//     auth.authorize(req, res, next)
// })
// router.post('/', (req, res, next)=>{
//     auth.authorize(req, res, next)
// })
// router.put('/:id', (req, res, next)=>{
//     auth.authorize(req, res, next)
// })
// router.delete('/:id', (req, res, next)=>{
//     auth.authorize(req, res, next)
// })

/* Get All + search*/
router.get('/', (req, res) => {
    let search = req.query
    let queryKeys = Object.keys(search)
    queryKeys.map(key =>{
        // Modify Queries to by 'like'
        if(key != '_id'){
            search[key] = { $regex: '.*' + search[key] + '.*'}
        }
    })
    Pokemon.find(search, null ,{"sort": {'_id': 1}} , (err, result) =>{
        if(err){
            return res.status(404).json({message: "Error from pokemon get all"})
        }
        res.status(200).send(result)
    })
});

/* Get one */
router.get('/:id', (req, res) => {
    Pokemon.findById(req.params.id, (err, result) =>{
        if(err) return res.status(400).json({message: "Error from pokemon get one" + err.details[0].message});
        if(!result) return res.status(404).send();
        res.status(200).json(result);
    })
})

/* Post */
router.post('/', auth.authorize, (req, res) =>{
    //TODO Make sure unique is working
    //   let id_is_unique = validate.idUnique(req.body.id);
    // if(validate.idUnique(req.body.id)){
        const {error} = validate.validatePokemon(req.body)
        if(error){
            return res.status(400).json({message: "Incorrect Pokemon format for POST: " + error.details[0].message})
        }
        const newPokemon = new Pokemon(req.body)
        newPokemon.save((err, result) =>{
            if(err){
                return res.status(400).json({message: "Error from pokemon post: " + err.message})
            }
            res.status(201).json({message: 'Created pokemon: ' + result})
        })
    // }
    // else{
    //     console.log(validate.idUnique(req.body.id))
    //     res.status(400).json({message: 'Pokedex number must be unique'})
    // }
})

/* Update */
router.put('/:id', auth.authorize, (req, res) =>{
    const {error} = validate.validatePokemon(req.body)
    if(error){
        return res.status(400).json({message: "Incorrect Pokemon format for PUT: " + error.details[0].message})
    }
    Pokemon.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, result) =>{
        if(err){
            return res.status(400).json({message: "Error from put request. " + err})
        }
        return res.status(200).json({message: "Successfully Updated: " + result})
    })
})

/* Delete */
router.delete('/:id', auth.authorize, (req, res) =>{
    Pokemon.findByIdAndRemove(req.params.id, (err, result) =>{
        if(err){
            return res.status(404).json({message: "Cannot find resource to delete"})
        }

        res.status(200).json({message: "Succesfully Deleted: " + result});
    })
})
module.exports = router;