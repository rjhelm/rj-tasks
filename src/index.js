const expres = require('express');
const cors = require('cors');
require("./db/mongoose");
const path = require('path');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = expres();
const port = process.env.PORT;

app.use(cors());
// auto parse incoming json to object
app.use(expres.json());
// *===========*
// user routes
app.use(userRouter);
// *===========*
// task routes
app.use(taskRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(expres.static('client/build'));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log('*===========*');
});