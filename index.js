const express = require("express")
const studentRouter = require("./routes/studentRouter");
const classRouter = require("./routes/classRouter");
const app = express();

app.use(express.json());

app.use('/students', studentRouter);
app.use('/classes', classRouter);

app.get("/",(req, res, next) => {
    console.log('This is the first middleware');
    next();
},
(req, res, next) => {
    console.log('This is the second middleware');
    next();
},
function(req, res){
    res.send("Hello World");
});



app.listen(process.env.PORT, function(){
    console.log(`Node Server listening on 3000`)
})