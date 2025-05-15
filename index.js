let express=require("express");
let bodyparser=require("body-parser");
let db=require("./db");
let app=express();
const path = require('path');

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(express.static('public'));
app.get("",(req,res)=>{
    res.render("nav.ejs");
});

app.get("/addcou",(req,res)=>{
    res.render("addcourse.ejs",{msg:""});
    
});
app.get("/addstud",(req,res)=>{
    
    db.query("select * from course01",(err,result)=>{
        if(err){
            
        }
        else{
            res.render("addstud.ejs",{cdata:result});
            
        }
        
    });
   
});

app.get("/vcourse",(req,res)=>{
    db.query("select * from course01",(err,result)=>{
        if(err){
            res.render("viewcourse.ejs");
        }
        else{
            res.render("viewcourse.ejs",{data:result});
            
        }
    });
});

app.get("/vstud",(req,res)=>{
    db.query("select s.sid,s.sname,s.semail,s.scontact,c.cname from student01 s join course01 c on s.scourse=c.cid;",(err,result)=>{
    
        if(err){
            res.render("viewstud.ejs");
        }
        else{
            res.render("viewstud.ejs",{data:result});
        }
    });
});

app.post("/save",(req,res)=>{
    let {name}=req.body;
   db.query("insert into course01 values('0',?)",[name],(err,result)=>{
      
   });
   res.render("addcourse.ejs",{msg:"save course successfully..."});
   
});
app.post("/saves",(req,res)=>{
    let{name,email,contact,scourse}=req.body;
    db.query("insert into student01 values('0',?,?,?,?)",[name,email,contact,scourse],(err,result)=>{
        db.query("select * from course01",(err,result)=>{
        
            if(err){
                res.render("addstud.ejs");
            }
            else{
                res.render("addstud.ejs",{cdata:result});
            }
        });
    } );
   
});
app.get("/DelEmpById",(req,res)=>{
    let stuid=parseInt(req.query.sid.trim());
    db.query("delete from student01 where sid=?",[stuid],(err,result)=>{})
    db.query("select s.sid,s.sname,s.semail,s.scontact,c.cname from student01 s join course01 c on s.scourse=c.cid;",(err,result)=>{
        
        if(err){
            res.render("viewstud.ejs");
        }
        else{
            res.render("viewstud.ejs",{data:result});
        }
    });

});
app.get("/DelcouById",(req,res)=>{
    let couid=parseInt(req.query.cid.trim());
    db.query("delete from course01 where cid=?",[couid],(err,result)=>{})
    db.query("select * from course01",(err,result)=>{
        
        if(err){
            res.render("viewcourse.ejs");
        }
        else{
            res.render("viewcourse.ejs",{data:result});
        }
    });

});
app.get("/search",(req,res)=>{
    let sname=req.query.sd;
    db.query("select s.sid,s.sname,s.semail,s.scontact,c.cname from student01 s join course01 c on s.scourse=c.cid where s.sname like '%"+sname+"%'",(err,result)=>{
        res.json(result); 
        
    })
});
app.get("/searchc",(req,res)=>{
    let sname=req.query.sd;
    db.query("select cid,cname from course01 where cname like '%"+sname+"%'",(err,result)=>{
        res.json(result); 
        
    })
});

app.get("/updatcou/:cid", (req, res) => {
    let coId = parseInt(req.params.cid);
    db.query("SELECT * FROM course01 WHERE cid = ?", [coId], (err, result) => {
       
        if (result.length === 0) {
            res.send("course not found");
            return;
        }
        res.render("updcourse.ejs", { data: result[0] }); 
    });
});
app.post("/updatcou/:cid", (req, res) => {
    let coId = parseInt(req.params.cid);
    let {name} = req.body; 
    
    db.query("UPDATE course01 SET cname = ? WHERE cid = ?", [name,coId],(err, result) => {
        if (err) {
            res.send("Error updating course");
            return;
        }
        res.redirect("/vcourse"); 
    });
});

app.get("/upstud",(req,res)=>{
    let sid=parseInt(req.query.sid.trim());
    db.query("select s.sid,s.sname,s.semail,s.scontact,s.scourse,c.cname from student01 s join course01 c on s.scourse=c.cid where sid=?;",[sid],(err,result1)=>{
    db.query("select * from course01",(err,result2)=>{
        res.render("updstud.ejs",{erecord:result1,cdata:result2});
        
    });
});
});
app.post("/updstudf",(req,res)=>{
    let{sid,name,email,contact,scourse}=req.body;
    db.query("update student01 set sname=?,semail=?,scontact=?,scourse=? where sid=?",[name,email,contact,scourse,sid],(err,result)=>{})
    db.query("select s.sid,s.sname,s.semail,s.scontact,c.cname from student01 s join course01 c on s.scourse=c.cid;",(err,result)=>{
    
        if(err){
            res.render("viewstud.ejs");
        }
        else{
            res.render("viewstud.ejs",{data:result});
        
        }
    });
    
});
app.get("/show",(req,res)=>{
    db.query("select * from course01",(err,result)=>{
        res.render("showdata.ejs",{showdata:result,data:[],select:0});
    
    })
   
});
app.post("/value",(req,res)=>{
    let{scourse}=req.body;
     db.query("select * from course01",(err,result1)=>{
    db.query("select s.sid,s.sname,s.semail,s.scontact,c.cname from student01 s join course01 c on s.scourse=c.cid where s.scourse=?;",[scourse],(err,result)=>{
    
        if(err){
            res.render("showdata.ejs");
        }
        else{
            res.render("showdata.ejs",{data:result,showdata:result1,select:1});
        
        }
    });
});
})
app.get("/studcount",(req,res)=>{
     db.query("select * from course01",(err,result)=>{
        res.render("studcount.ejs",{showdata1:result,data:[],select:0});
    
    })
});
app.post("/value2",(req,res)=>{
    let{scourse}=req.body;
     db.query("select * from course01",(err,result1)=>{
    db.query("SELECT c.cname, COUNT(s.scourse) AS stdcount FROM course01 c LEFT JOIN student01 s ON c.cid = s.scourse WHERE c.cid = ? GROUP BY c.cname;",[scourse],(err,result)=>{
    
        if(err){
            res.render("studcount.ejs");
        }
        else{
            res.render("studcount.ejs",{showdata1:result1,data:result,select:1});
        
        }
    });
});
})
app.listen(3000,()=>{
    console.log("server is started");
});