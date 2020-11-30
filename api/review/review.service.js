
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
 

async function query(filterBy = {}) {
    // TODO: Build the criteria with $regex
    // criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('review')
    try {
        // const reviews = await collection.find(criteria).toArray();
        var reviews = await collection.aggregate([
            {
                $match: filterBy
            },
            {
                $lookup:
                {
                    localField: 'userId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                $unwind: '$byUser'
            },
            {
                $lookup:
                {
                    localField: 'toyId',
                    from: 'toy',
                    foreignField: '_id',
                    as: 'aboutToy'
                }
            },
            {
                $unwind: '$aboutToy'
            }
        ]).toArray()

       
        reviews = reviews.map(review => {
            review.byUser = { _id: review.byUser._id, username: review.byUser.username }
            //review.aboutToy = {}
            delete review.byUserId;
            return review;
        })

        return reviews
    } catch (err) {
        console.log('ERROR: cannot find reviews')
        throw err;
    }
}

async function remove(reviewId) {
    const collection = await dbService.getCollection('review')
    try {
        await collection.deleteOne({ "_id": ObjectId(reviewId) })
    } catch (err) {
        console.log(`ERROR: cannot remove review ${reviewId}`)
        throw err;
    }
}


async function add(review) {
    //review.byUserId = ObjectId(review.byUserId);
    //review.aboutUserId = ObjectId(review.aboutUserId);
    review.toyId= ObjectId(review.toyId) 
    review.userId= ObjectId(review.userId) 
    console.log('add review',review)
    const collection = await dbService.getCollection('review')
    try {
        await collection.insertOne(review);
        return review;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    return criteria;
}

module.exports = {
    query,
    remove,
    add
}


