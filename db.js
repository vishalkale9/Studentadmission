let mysql=require('mysql2');
let conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'vishal',
    database:'test01'
});
    conn.connect((err)=>{
        if(err){
            console.log("database is not connect",err.message);
        }
        else{
            console.log("database is connect...");
        }

    });
module.exports=conn;