const axios = require('axios');
const fs = require('fs');

verifyKittenSells();

function verifyKittenSells(){
    setTimeout(() => {
        axios.get('https://api.ftmscan.com/api?module=account&action=tokentx&address=0xc748e6de30222f4e9bc01812860ff005a82543e6&startblock=0&endblock=999999999&sort=desc&apikey=4U6J2QNXT1YWESGVETQJZ86YT2MP4MUG2M').then(data => {
            let lastJson = require("./output.json");
            let currentJson = data.data;

            if(currentJson.result.length > lastJson.result.length){

                //Get quantity of sold kittens
                let quantity = currentJson.result.length - lastJson.result.length;
                console.log(quantity + ' new kitten(s) sold');


                //Get last sold kittens transaction data
                for (let i = currentJson.result.length - quantity; i < currentJson.result.length; i++) {
                    const element = currentJson.result[i];
                    console.log('Kitten information: ', element);    
                    
                    //discord message bot here
                }
            }

            fs.writeFile("./output.json",  JSON.stringify(currentJson), 'utf8', function (err) {
                if (err) {
                    console.log("An error occured while writing JSON Object to File.");
                    return console.log(err);
                }
            });
        })

        verifyKittenSells();        
    }, 5000)
}