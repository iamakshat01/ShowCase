const {addcategory,getitemsbycategory,getitemsbyuser}=require('../controllers/category')


function categoryRoutes (fastify, options, done) {

    // TO ADD A CATEGORY
    fastify.post('/addcategory',{
        type: 'object',
        preHandler: [fastify.authenticate],
        handler: addcategory
    })

    // TO GET ALL ITEMS OF THAT SPECIFIC CATEGORY
    fastify.get('/category/:id',{
        type: 'array',
        handler: getitemsbycategory
    })

    // TO GET ALL ITEMS OF A USER WITH GIVEN ID
    fastify.get('/category/all/:id',{
        type: 'array',
        handler: getitemsbyuser
    })

    done()
}

module.exports=categoryRoutes