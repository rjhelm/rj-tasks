const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    // for deprecation warnings
    useFindAndModify: false
});