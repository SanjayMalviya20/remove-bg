const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
    {
clerkId: {
    type: String,
    required: true,
    unique: true,
},
email: {
    type: String,
    required: true,
    unique: true,
},
firstname: {
    type: String,
    required: true,
},
lastname: {
    type: String,
    required: true,
},
image: {
    type: String,
    required: true,
},
creditBalance: {
    type: Number,
    default: 5,
},
    },
    {
        timestamps: true,
    }
);
  
  const UserMOdel =mongoose.models.User || mongoose.model("User", userSchema);
  
  export default UserMOdel;