const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://katudigamer_db_user:AIuSxtO128hC2FRw@cluster0.icnensh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Database is Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports =dbConnect;