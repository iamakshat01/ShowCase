const db = require('../models')
const fs = require('fs');

const additem = async function (req, reply) {
    
    try {
        const item = await db.Item.create({
            name: req.body.name,
            description:req.body.description
        })

        if(req.file) {
            item.photo.data=req.file.buffer
            item.photo.contentType=req.file.type
        }

        await item.save()
        
        const category = await db.Category.findById(req.body.categoryId)
        category.items.push(item._id)

        await category.save()


        reply.code(201).send(item)
    
    } catch (err) {
        reply.code(500).send(err)
    }
     
}

const getitem = async function (req, reply) {
    
    try {
        const item = await db.Item.findById(req.params.id)
        reply.code(200).send(item)
    
    } catch (err) {
        reply.code(400).send(err)
    }
     
}

const getphoto = async function (req, reply) {
    
    try {
        const item = await db.Item.findById(req.params.id)
        reply.code(200).send(item.photo)
    
    } catch (err) {
        reply.code(400).send(err)
    }
     
}



module.exports={additem, getitem, getphoto}