const logger = require('../../services/logger.service')
const mixService = require('./mix.service')

// TODO: needs error handling! try, catch

async function getMixs(req, res) {
    try {
        console.log()
        const mixes = await mixService.query(req.query)
        //console.log('mixes',mixes)
        res.send(mixes)
    } catch (err) {
        logger.error('Cannot get mixes', err);
        res.status(500).send({ error: 'cannot get mixes' })

    }
}

async function getMix(req, res) {
    //console.log('mix controller',req.params.id)
    const mix = await mixService.getById(req.params.id)
    //console.log('mix controller',mix)
    res.send(mix)
}

async function deleteMix(req, res) {
    console.log('mix controller delete',req.params.id)
    try {
        await mixService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete mix', err);
        res.status(500).send({ error: 'cannot delete mix' })
    }
}

async function addMix(req, res) {
    try {
        var mix = req.body;
        mix = await mixService.add(mix)
    } catch (err) {
        logger.error('Cannot add mix', err);

    }
   
    //mix.byUser = req.session.mix;
    // TODO - need to find aboutUser
    //mix.aboutUser = {}
    res.send(mix)
}

async function updateMix(req, res) {

    try{
        const mix = req.body;
        console.log('controlller updateMix',mix)
        
        await mixService.update(mix)
        res.send(mix)
    }catch(err){
        console.log(' CUS AMAK ERORR IN UPDATEING BLYAT !!!!!!!!!!!!! :',err);
    }
}

module.exports = {
    getMixs,
    getMix,
    deleteMix,
    addMix,
    updateMix
}