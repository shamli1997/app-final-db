const mysql=require("mysql");
var express=require("express");
var empRouter=express();
var Joi=require("joi");

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'manager',
    database:'awp'
    // host:192.168.43.235,
    // port:9090
});

var myData=[];
connection.connect();

function validate(bodyContent)
{
    const schema = {
        "name":Joi.string().required(),
        "no":Joi.number().required(),
        "city":Joi.required()
    };
    return Joi.validate(bodyContent,schema);
}

empRouter.get("/",function(req,res){
    connection.query("select *from emp",function(err,result){
        if(err==null)
        {
            myData=result;
            res.contentType=("application/json");
            res.send(JSON.stringify(myData));
        }
        else{
            res.send("Something went wrong..!!");
        }

    });
});

// empRouter.get("/:no",function(req,res){
//     console.log("You searched for " + req.params.no);
//     var empSearched=myData[parseInt(req.params.no)-1];
//     res.contentType("application/json");
//     res.send(empSearched);
// });

empRouter.post("/",function(req,res){
let validationresult=validate(req.body);
if(validationresult.error==null)
{ 
let eno=parseInt(req.body.no);
let ename=req.body.name;
let ecity=req.body.city;

let query=`insert into emp values(${eno},'${ename}','${ecity}')`;
console.log(query);
connection.query(query,function(err,result){
    if(err==null)
    {
        res.contentType("application/json");
        res.send(JSON.stringify(result));
    }
    else{
        res.contentType("application/json");
        res.send(err);

    }
});
}
else{
    res.contentType("application/json");
        res.send(JSON.stringify(validationresult));
}
});

empRouter.delete("/:no",function(req,res){
    let eno=parseInt(req.params.no);
    let query=`delete from emp where no=${eno}`;
        console.log(query);

    connection.query(query,function(err,result){
        if(err==null)
        {
            res.contentType("application/json");
            res.send(JSON.stringify(result));
        }
        else{
            res.contentType("application/json");
            res.send(err);
    
        }
    });

});

empRouter.put("/:no",function(req,res){

    let eno=parseInt(req.params.no);
    let ename=req.body.name;
    let ecity=req.body.city;
    let query=`update emp set name='${ename}',city='${ecity}' where no=${eno};`;

    connection.query(query,function(err,result){
        if(err==null)
        {
            res.contentType("application/json");
            res.send(JSON.stringify(result));
        }
        else{
            res.contentType("application/json");
            res.send(err);
    
        }
        
    });
});
// empRouter.get("/:no", function(request, response){
//     console.log("You searched for " + request.params.no);
//     var query = `select * from emp where no =${request.params.no}`;
//     console.log(query);
//     connection.query(query, 
    
//         function(err, result){
//         if(err==null)
//         {
//             console.log(JSON.stringify(myData[0]));
//            myData =  result;
//            response.contentType("application/json");
//            response.send(JSON.stringify(myData[0]));
//         }
//         else
//         {
//            response.send("Something went wrong!"); 
//         }
//     });
    
//});

empRouter.get("/:no", function(request, response){
    console.log("You searched for " + request.params.no);
    var empSearched= myData[parseInt(request.params.no) - 1];
    response.contentType("application/json");
    response.send(empSearched);
});
module.exports=empRouter;