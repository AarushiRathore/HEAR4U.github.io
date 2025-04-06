const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        min: 6,
        max: 50
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 25
    }
    ,
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    date:{
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("User", UserSchema)s
