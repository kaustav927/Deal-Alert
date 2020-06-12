
const nightmare = require('nightmare')()

// if using .ca URL, priceNumber replaces CDN$ instead of $
// URL needs to be trimmed 
checkPrice()

async function checkPrice() {
  
    const priceString = await nightmare.goto("https://www.amazon.ca/i5-9400F-Desktop-Processor-Without-Graphics/dp/B07MRCGQQ4")
                                       .wait("#priceblock_ourprice")
                                       .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
                                       .end()
    const priceNumber = parseFloat(priceString.replace('CDN$', ''))
    if (priceNumber < 250) {
        console.log("it is cheap")
        console.log(priceNumber)
    }
    else{
        console.log("it is expensive")
        console.log(priceNumber)
    }
}