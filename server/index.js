const fastify = require('fastify')({ logger: true })
const mongoose = require('mongoose')
const oauthPlugin = require('fastify-oauth2')
const multer = require('fastify-multer')
require('dotenv').config()
const fp = require("fastify-plugin")


// enabling cors
fastify.register(require("fastify-cors"), {
  origin: "*" // allow all origins (BAD)
});


// swagger documentation -> automatically scrapping 
fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  },
})



// enabling jwt and adding a authenticate middle function
fastify.register(require("fastify-jwt"), {
  secret: process.env.SECRET
})

fastify.decorate("authenticate", async function(request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
})

// register fastify content parser
fastify.register(multer.contentParser)



// category routes
fastify.register(require('./routes/category'))

// auth routes
fastify.register(require('./routes/auth'))

//item routes
fastify.register(require('./routes/item'))



//connected fastify to mongoose
try {
    mongoose.connect(process.env.DATABASE,{ 
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true 
    });
    fastify.log.info("DB connected")
  } catch (e) {
    fastify.log.error(e);
}


// start the server
const start = async () => {
  try {
    await fastify.listen(process.env.PORT)
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)
  }
}

start()