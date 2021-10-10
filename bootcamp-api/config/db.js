const mongoose = require('mongoose');

const connectString = process.env.DATABASE_CONNECTION;

const connectDB = async () => {
   try {
       await mongoose.connect(
           connectString, {
               useUnifiedTopology: true,
               useNewUrlParser: true,
           }
       )
       console.log('Mongodb connectio SUCCESS')
   } catch (error) {
    console.log('Mongodb connectio FAIL')
    console.log(error)
    process.exit(1)
   }
}

module.exports = connectDB