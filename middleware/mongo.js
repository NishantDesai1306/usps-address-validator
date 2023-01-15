import mongoose from "mongoose";

const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }

  await mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) console.log(err);
    else console.log("mongdb is connected");
  });
  return handler(req, res);
};

export default connectDB;
