const express = require('express')
const {requireAuth, requireAdmin,requireUser} = require('../../middlewares/requireAuth.middleware')
const {addMix,updateMix, getMixs, getMix, deleteMix} = require('./mix.controller')
const router = express.Router()

// middleware that is specific to this router

//router.use(requireUser)
//router.use(requireAdmin)
router.get('/', getMixs) //requireUser
router.get('/:id', getMix) //requireUser

router.post('/' , addMix) //,requireAdmin
router.put('/', updateMix) //, requireAdmin
router.delete('/:id', deleteMix) //, requireAdmin

module.exports = router