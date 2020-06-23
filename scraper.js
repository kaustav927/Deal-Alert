const nightmare=require('nightmare')();
const nodemailer=require('nodemailer');
require('dotenv').config();



const args = process.argv.slice(2)
const url = args[0]
const minPrice = args[1]
var ItemString=[]

let transporter=nodemailer.createTransport({
    service:'outlook',
    auth:{
        user: process.env.Username,
        pass: process.env.Password
    }
});

let mailOptions={
    from: 'ksharm69@uwo.ca',
    to:'pirem83540@ddlre.com',
    subject: `The price of ${ItemString} has dropped below ${minPrice}`,
    text: `The price on ${url} has dropped below ${minPrice}`
}


checkPrice()
async function checkPrice() {
    const priceString = await nightmare.goto(url)
                                       .wait("#priceblock_ourprice")
                                       .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
                                       .end()

                                     
    const priceNumber = parseFloat(priceString.replace('CDN$', ''))
        if (priceNumber < minPrice) {
          console.log("it is cheap")
          console.log(priceNumber, ItemString)
          transporter.sendMail(mailOptions,function(err,data){
              if(err){
                  console.log('error',err)
              }
              else{
                  console.log('Email has sent')
              }

          });
        }
}




 //node scraper.js https://www.amazon.ca/gp/product/B07MQP5LNM?pf_rd_r=QVVDBB0NHY2X25W1V2YD 300