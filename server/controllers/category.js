const db = require('../models')

const addcategory = async function (req, reply) {
    
    try {
        const category = await db.Category.create(req.body)
        const user = await db.User.findById(req.user.id)
        user.categories.push(category._id)
        await user.save()
        reply.code(201).send(category)

    } catch (err) {
        reply.code(500).send(err)
    }
     
}

const getitemsbycategory = async function (req, reply) {
    
    try {
        const category = await db.Category.findById(req.params.id).populate('items','name description')
        reply.code(200).send(category.items)
    } catch (err) {
        reply.code(400).send(err)
    }
     
}

const getitemsbyuser = async function (req, reply) {
    
    try {
        const user = await db.User.findById(req.params.id).populate({
            path: 'categories',
            populate: {
                path: 'items',
                model: 'Item',
                select:'-photo'
            } 
        })
        reply.code(200).send(user.categories)
    } catch (err) {
        reply.code(400).send(err)
    }
     
}





module.exports={addcategory,getitemsbycategory,getitemsbyuser}