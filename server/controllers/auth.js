const db = require('../models')
const sget = require('simple-get-promise')


const register = async function (request, reply) {
    
    try {
        
        const access_token = request.body.token
        // if later you need to refresh the token you can use
        // const newToken = await this.getNewAccessTokenUsingRefreshToken(token.refresh_token)
        // reply.send({ access_token: token.access_token })

        // fetch the user profile with given access token
        const data = await sget.get({
            url: 'https://www.googleapis.com/oauth2/v2/userinfo',
            headers: {
                Authorization: 'Bearer ' + access_token
            },
        }).then(sget.asJson)


        const user = await db.User.findOne({
            email: data.email
        })


        // if the user is already registered
        if(user) {
            
            const { id,email}= user
            const jwttoken=this.jwt.sign({id,email})

            reply.code(200).send({user,jwttoken});
        }
        else {

            // creating a new user
            const newuser = await db.User.create({
                email: data.email,
                name: data.name
            })

            const { id,email}=newuser
            const jwttoken=this.jwt.sign({id,email})

            reply.code(201).send({newuser,jwttoken})
        }

    } catch (err) {
        reply.code(500).send(err)
    }
     
}

const editprofile = async function(req, reply) {

    try {
        const user = await db.User.updateOne({_id: req.user.id},req.body)
        reply.code(202).send(user)

    } catch(err) {
        reply.code(400).send(err)
    }
}


const getprofile = async function(req, reply) {

    try {
        const user = await db.User.findById(req.user.id)
        reply.code(201).send(user)
    } catch(err) {
        reply.code(400).send(err)
    }
}

module.exports={register,editprofile,getprofile}