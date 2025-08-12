// import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     // the opt is for node.js  v4.0 and will be depricated soon 
//     // , {
//     //   useNewUrlParser: true,
//     //   useUnifiedTopology: true
//     // }

//     const conn = await mongoose.connect(process.env.MONGODB_URL, {
//       useNewUrlParser: true,
//      useUnifiedTopology: true
//      } );

//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`❌ MongoDB Connection Error: ${error.message}`);
//     process.exit(1); // Stop app if DB connection fails
//   }
// };

// export default connectDB;


// import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URL);
//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`❌ MongoDB Connection Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// export default connectDB;

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Connect using the connection string from your .env file
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Stop the app if DB connection fails
  }
};

export default connectDB;

