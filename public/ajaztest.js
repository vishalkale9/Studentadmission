

let ajaxImpl=(str)=>{
    let xhttp=new XMLHttpRequest();

    xhttp.onreadystatechange=function(){
        let tablebody=document.getElementById("tBody");
        if(this.readyState==4&&this.status==200)
        {
            let responsedata=this.responseText;
            let jsonObj=JSON.parse(responsedata);
            tablebody.innerHTML = "";
            jsonObj.forEach((item,index)=>{
                let row=document.createElement("tr");

                let col=document.createElement("td");
                col.innerHTML=""+(index+1);
                row.appendChild(col);

                col=document.createElement("td");
                col.innerHTML=""+item.sname;
                row.appendChild(col);

                col=document.createElement("td");
                col.innerHTML=""+item.semail;
                row.appendChild(col);

                col=document.createElement("td");
                col.innerHTML=""+item.scontact;
                row.appendChild(col);

                 col=document.createElement("td");
                col.innerHTML=""+item.cname;
                row.appendChild(col);

                col=document.createElement("td");
                col.innerHTML="<a href='/DelEmpById?sid="+item.sid+"'  style='color: rgb(234, 89, 89); margin-left: 20px;'><i class='fa-solid fa-trash'></i></a>";
                row.appendChild(col);

                col=document.createElement("td");
                col.innerHTML = "<a href='/upstud?sid=" +item.sid+"'  style='margin-left: 20px;'><i class='fa-regular fa-pen-to-square'></i></a>";
                row.appendChild(col);

                tablebody.appendChild(row);
            });

        }
    };

    xhttp.open("GET","/search?sd="+str,true);
    xhttp.send();
}

let ajaxImplc=(str)=>{
    let xhttp=new XMLHttpRequest();

    xhttp.onreadystatechange=function(){
        let tablebody=document.getElementById("tBody");
        if(this.readyState==4&&this.status==200)
        {
            let responsedata=this.responseText;
            let jsonObj=JSON.parse(responsedata);
            tablebody.innerHTML = "";
            jsonObj.forEach((item,index)=>{
                let row=document.createElement("tr");

                let col=document.createElement("td");
                col.innerHTML=""+(index+1);
                row.appendChild(col);

                col=document.createElement("td");
                col.innerHTML=""+item.cname;
                row.appendChild(col);

                col=document.createElement("td");
                col.innerHTML="<a href='/DelcouById?cid="+item.cid+"'  style='color: rgb(234, 89, 89); margin-left: 20px;'><i class='fa-solid fa-trash'></i></a>";
                row.appendChild(col);

                col=document.createElement("td");
                col.innerHTML = "<a href='/updateemp/" + item.cid + "'  style='margin-left: 20px;'><i class='fa-regular fa-pen-to-square'></i></a>";
                row.appendChild(col);

                tablebody.appendChild(row);
            });

        }
    };

    xhttp.open("GET","/searchc?sd="+str,true);
    xhttp.send();
}