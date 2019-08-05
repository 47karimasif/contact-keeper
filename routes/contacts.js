const express = require ("express")
const router = express.Router();

// @route    GET api/contacts
// @desc     get all user contact
// @acess    Private

router.get("/",(req,res)=>{
    res.send("Get all contacts")
   })

// @route    POST api/contacts
// @desc     add new contact
// @acess    Private

router.post("/",(req,res)=>{
    res.send("Add contact")
   })

// @route    PUT api/contacts
// @desc     update contact
// @acess    Private

router.put("/:id",(req,res)=>{
    res.send("update contact")
   })

// @route    DELETE api/contacts
// @desc     delete contact
// @acess    Private

router.delete("/:id",(req,res)=>{
    res.send("delete contact")
   })


module.exports = router