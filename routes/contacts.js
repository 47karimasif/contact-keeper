const express = require ("express")
const router = express.Router();
const auth = require("../middleware/auth")
const {check, validationResult} = require("express-validator")
const Contact = require ("../models/Contact")
const User = require ("../models/User")

// @route    GET api/contacts
// @desc     get all user contact
// @acess    Private

router.get("/",auth, async (req,res)=>{
    try{
        const contacts = await Contact.find({user : req.user.id }).sort({date:-1})  //finding contacts created by the user who is now logged in
        res.json(contacts)   // an array of all the contacts created by that user
    } catch(err) {
        console.log(err.message)
        res.status(500).send("server Error")
    }
   })

// @route    POST api/contacts
// @desc     add new contact
// @acess    Private

router.post(
    "/",
    [
        auth,
        [
            check("name","Name is required").not().isEmpty()

        ]

    ],
    async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {name,email,phone,type} =req.body
    try{
        const newContact = new Contact ({
            name,
            email,
            phone,
            type,
            user:req.user.id
        })

        const contact = await newContact.save()
        res.json(contact)
    } catch(err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }
    },
   )

// @route    PUT api/contacts
// @desc     update contact
// @acess    Private

router.put("/:id",auth,async(req,res)=>{
    const {name,email,phone,type} =req.body

    const contactFields = {}
    if(name) contactFields.name = name
    if(email) contactFields.email = email
    if(phone) contactFields.phone = phone
    if(type) contactFields.type = type

    try{
        let contact = await Contact.findById(req.params.id)
        if(!contact) return res.status(404).json ({msg:"Contact not found"})

        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg:"not authorized"})
        }
        contact =await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields},
            {new:true})

            res.json(contact)
    } catch(err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }

   })

// @route    DELETE api/contacts
// @desc     delete contact
// @acess    Private

router.delete("/:id",auth,async(req,res)=>{
    try{
        let contact = await Contact.findById(req.params.id)
        if(!contact) return res.status(404).json ({msg:"Contact not found"})

        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({msg:"not authorized"})
        }
        await Contact.findByIdAndDelete(req.params.id)
        res.json("contact removed")
    } catch(err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }
   })


module.exports = router