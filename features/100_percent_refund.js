const context = require('../bot/botkit/context.js');
const nlp = require('compromise')

module.exports = function(controller) {
    controller.hears('i would like the 100% refund', 'message', async (bot, message) => {
        await bot.reply(message, 'that does not exist.');
    })

    controller.hears(message => {
        const doc = nlp(message.text);

        console.log(JSON.stringify(doc.json(), null, 2));
        if (doc.has("refund")) {
            context.refundHasMentionProduct = false
            if (doc.has("refund #Noun") || doc.has("refund the #Noun")) {
                context.refundProduct = doc.match("#Noun").text();
                context.refundHasMentionProduct = true
            }
            return true
        }
        return false
    }, 'message', async (bot, message) => {
        await bot.reply(message, context.refundHasMentionProduct + "");
        if (context.refundHasMentionProduct) {
            await bot.reply(message, context.refundProduct);
        }
    })

    controller.hears(['i do not have a warranty', 'no warranty'], 'message', async (bot, message) => {
        await bot.reply(message, 'Then i am unable to help you with your problem. please refer to our terms and conditions');
    })

    controller.hears(['i lost my warranty', 'warranty lost'], 'message', async (bot, message) => {
        await bot.reply(message, 'That is not my problem. please refer to our terms and conditions');
    })

    controller.hears(['i have a warranty', 'warranty', 'return product', 'return'], 'message', async (bot, message) => {
        await bot.reply(message, 'did you break something? Do you want to return something? Please send it to your nearest facility.');
        //yes or no question
        //if yes, asks for their country, save that country in that context.
        //if no, remove context. 
    })


   



    

    
}
