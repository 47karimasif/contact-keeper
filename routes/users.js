const express = require ("express")
const router = express.Router();

// @route    GET api/users
// @desc     Register a user
// @acess    Public

router.post("/",(req,res)=>{
       res.send("register a user")
   })

module.exports = router