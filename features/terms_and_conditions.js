const context = require('../bot/botkit/context');
const natural = require('natural')
const classifications = require('../bot/botkit/classifications');
const getIntent = require('../bot/botkit/getIntent');
const Tokenizer = new natural.WordTokenizer();

module.exports = function(controller) {
    controller.hears(message => getIntent(message.text, classifications.inquiries.returnProduct)
        , 'message', async (bot, message) => {
            await bot.reply(message, {type: 'typing'});
            setTimeout(async () => {
                // will have to reset context because turn has now ended.
                    await bot.changeContext(message.reference);
                await bot.reply(message, `<b><h3>Return of Product</h3></b>`);
                await bot.reply(message, `<u>Regarding Unused,Unopened, or Overaged Products</u><br><br>
                    Amway will only accept return services if products are...<br><br>
                    * Bought within 10 days of purchase. <br>
                    * in original packaging, and unopened in good condition. `);
                await bot.reply(message, `<u>Regarding Damaged and Wrong Products</u><br><br>
                    Amway will only accept return services if products are...<br><br>
                    * <b>Received</b> within 10 days from delivery <br>
                    * in original packaging, and unopened in good condition. `);
                await bot.reply(message, `Please prepare the following upon returning in our shops - <br><br>
                    * Invoice <br>
                    * Product name, quantity ordered <br>
                    * Proper Reason for return <br>
                    * Name, Address <br><br>
                    Amway reserves the rights to refuse return if the customer fails to prepare and meet the criteria of the information mentioned.`);
            }, 1000);     

        })

    controller.hears(message => getIntent(message.text, classifications.inquiries['100satisfaction']),
        'message', async (bot, message) => {
            await bot.reply(message, {type: 'typing'});
            setTimeout(async () => {
                // will have to reset context because turn has now ended.
                    await bot.changeContext(message.reference);
                //100% satisfaction
                await bot.reply(message, `<b><h3>100% Satisfaction</h3></b>`);
                await bot.reply(message, ` Amway ensures that you are getting the best out of our services. If you do not like our product, within 90-days from purchase date, you are allowed to return the product with full refund <br><br>
                    This <b>does not</b> apply to... <br><br>
                    * Products that are intentionally damaged <br>
                    * Durable products, such as the Atmosphere Sky, Atmosphere Drive, and Air Purifiers that are under a seperate manufacturer warranty. <br>
                    * Any product in the shoppers catalouge, involving certain consumable items, such as XS drinks, and other seasonable items. <br> 
                    * Products that have been puchased by third-party sellers.
                    `);  
            }, 1000);

        })

    controller.hears(message => getIntent(message.text, classifications.inquiries.tac),'message', async(bot, message) => {
        if (Tokenizer.tokenize(message.text).includes('other')) {
            await bot.reply(message, {type: 'typing'});
            setTimeout(async () => {
                // will have to reset context because turn has now ended.
                    await bot.changeContext(message.reference);
                await bot.reply(message, `<b><h3>Other</h3></b>`);    
                await bot.reply(message, `- The chatbot holds no responsibility for any possible mental damages, if you are offended over a chatbot you should get some help.`);
                await bot.reply(message, '- Products displayed may update in the near future. As the chatbot is still in development');
            }, 1000);

        }
        else {
            await bot.reply(message, {type: 'typing'});
            setTimeout(async () => {
                // will have to reset context because turn has now ended.
                    await bot.changeContext(message.reference);
                await bot.reply(message, {
                    text: "Here is the terms and conditions that Amway has, nerd,",
                    quick_replies: [
                        {
                            title: "Return Product",
                            payload: "I want to return a product."
                        },
                        {
                            title: "100% satisfaction",
                            payload: "What is the 100% satisfaction policy?"
                        },
                        {
                            title: "Other",
                            payload: "What are your other terms and conditions?"
                        }
                    ]
                })      
            }, 500);


        }
    });
}
