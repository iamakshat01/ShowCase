const {register,editprofile,getprofile}=require('../controllers/auth')

const user = {
    type: 'object',
    handler: register
}

function authRoutes (fastify, options, done) {
    
    // CALLBACK AFTER GETTING ACCESS TOKEN FROM /LOGIN/GOOGLE
    fastify.get('/login/google/callback',user)
    
    fastify.get('/user/profile',{
        type: 'object',
        preHandler: [fastify.authenticate],
        handler: getprofile
    })
    // PATCH REQUEST TO EDIT THE SPECIFIC PROFILED FIELDS OF USER
    fastify.patch('/user/edit',{
        type: 'object',
        preHandler: [fastify.authenticate],
        handler: editprofile
    })

    done()
}

module.exports=authRoutes