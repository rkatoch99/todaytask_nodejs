// sart mySql connnection

const { createConnection } = require("net");


createConnection(err,(data)=>{
    if(err){
        throw err;
    }
    
    fetchRows(err,(err,data)=>{

        if( err){
            throw err
        }
       loop[data as row]
       if(row.to_update==1){
           updateRow(err,(err,data)=>{
               
           })
       }
    })
})