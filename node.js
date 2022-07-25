
var fs =require('fs')                   //import the file system module

function hello(){
    console.log("end really  ")


}
console.log("string")


fs.readFile('node.js',(err,data)=>{                     //read a file by using fs and for showing th err we use callback function
    if(err){
        throw err
    }
    console.log("Data from the file"+data)
})

hello()


