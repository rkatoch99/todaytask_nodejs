console.log("hello world")          // first task to print hello world  




console.log('Start.')               // start the loop 
var i =0 
for(i=0;i<20;i++)
{
    console.log(i)
}



//write a code to display current date

console.log(Date())



//Define a JSON object and write a loop to disply it    

const JSON_Data={
    "Fistname":"rahul",
    "lastname":"KATOCH",
    "location":"NewDelhi",
    "Statte":"Delhi",
    "phone":545348654154,
}

for(const i in JSON_Data){
    console.log(i,":",JSON_Data[i])
}


// JSON_Data.map((value)=>{             // this is used when you converting the Object into the Arry
//     return console.log(value)
// })

process.exit()