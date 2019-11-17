var express=require("express");
var config=require("config");
var empRoutes=require("./routes/emp");
//var adminRoute=require("./routes/admin");
var app=express();

const port=parseInt(config.get("port"));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());
app.use("/employees",empRoutes);

//app.use("/admin",adminRoute);

 app.listen(port,function(){
     console.log("Server started on port " + port);
 })

