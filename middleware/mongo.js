import mongoose from "mongoose";

const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState === mongoose.ConnectionStates.connected) {
    return handler(req, res);
  }

  mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    
    console.log("mongdb is connected");
    return handler(req, res);
  });
};

export default connectDB;
