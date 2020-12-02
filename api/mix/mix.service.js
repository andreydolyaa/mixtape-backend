const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
 
 
async function query(filterBy = {}) {
    // TODO: Build the criteria with $regex
     const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('mix')

    try {
         const mixes = await collection.find().toArray();
       // var mixes = await collection.aggregate([
       //     {
       //         $match: filterBy
       //     }
       // ]).toArray()
        //console.log('mixes',mixes)
        return mixes
    } catch (err) {
        console.log('ERROR: cannot find mixes')
        throw err;
    }
}


async function getById(mixId) {
    const collection = await dbService.getCollection('mix')
    try {
        const mix = await collection.findOne({ '_id': ObjectId(mixId) })
        //delete mix.password

       // mix.givenReviews = await reviewService.query({ byUserId: ObjectId(mix._id) })
       // mix.givenReviews = mix.givenReviews.map(review => {
       //     delete review.byUser
       //     return review
       // })

       console.log(`finding mix ${mix}`)
        return mix
    } catch (err) {
        console.log(`ERROR: while finding mix ${mixId}`)
        throw err;
    }
}
 
async function remove(mixId) {
    const collection = await dbService.getCollection('mix')
    try {
        //bjectId(mixId)
        await collection.deleteOne({ "_id": ObjectId(mixId) })
    } catch (err) {
        console.log(`ERROR: cannot remove mix ${mixId}`)
        throw err;
    }
}


async function add(mix) {
    const collection = await dbService.getCollection('mix')
    try {
        await collection.insertOne(mix);
        return mix;
    } catch (err) {
        console.log(`ERROR: cannot insert mix`)
        throw err;
    }
}

async function update(mix) {
    console.log('MIX BACK SERVICE : ',mix);
    const collection = await dbService.getCollection('mix')
    mix._id = ObjectId(mix._id);
    try {
        await collection.updateOne({ _id: mix._id }, { $set: mix })
        return mix
    } catch (err) {
        console.log(`ERROR: cannot update mix ${mix._id}`)
        throw err;
    }
}


function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.name) {
        criteria.name = filterBy.name
    }
    
    return criteria;
}

module.exports = {
    query,
    getById,
    remove,
    add,
    update
}


