const {additem, getitem, getphoto} =require('../controllers/item')
const multer=require('fastify-multer')

function itemRoutes (fastify, options, done) {

    const storage = multer.memoryStorage()
    const upload = multer({ storage: storage })
    
    // TO ADD A ITEM 
    fastify.post('/additem',{

        schema: {
            response: {
              201: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  description: {type: 'string'},
                  _id: {type: 'string'}
                },
              },
            },
        },
        preHandler: upload.single('image'),
        handler: additem
    })

    // GET SPECIFIC ITEM WITH ID
    fastify.get('/item/:id',{
        schema: {
            response: {
              200: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  description: {type: 'string'},
                  _id: {type: 'string'}
                },
              },
            },
        },
        handler: getitem
    })

    // GET PHOTO OF ITEM WITH ID
    fastify.get('/item/:id/photo',{
        handler: getphoto
    })


    done()
}

module.exports=itemRoutes