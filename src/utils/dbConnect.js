import mongoose from "mongoose";

const DB_URL = process.env.DB_URL;

if (!DB_URL) {
  throw new Error("DB_URL must be specified");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    cached.promise = mongoose
      .connect(DB_URL, options)
      .then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    throw error;
  }
};

export { dbConnect };





// import mongoose from "mongoose";

// const DB_URL = process.env.DB_URL;

// if(!DB_URL) {
//     throw new Error("DB_URL must be specified");
// }

// let cached = global.mongoose;

// if(!cached) {
//     cached = global.mongoose = {conn:null,promise:null}
// }

// const dbConnect = async () => {
//     if(cached.conn){
//         return cached.conn;
//     };
//     if(!cached.promise){
//         const options = {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         }
//         cached.promise = mongoose.connect(DB_URL, options).then((mongoose) => {
//             return mongoose;
//         })
//     }
//     cached.con = await cached.promise;
//     return cached.conn;
// };

// export default dbConnect;