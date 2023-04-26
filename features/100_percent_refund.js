const context = require('../bot/botkit/context.js');
const nlp = require('compromise')

module.exports = function(controller) {
    controller.hears('i would like the 100% refund', 'message', async (bot, message) => {
        await bot.reply(message, 'no lol');
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
        await bot.reply(message, 'Then i am unable to help you with your problem.');
    })

    controller.hears(['i lost my warranty', 'warranty lost'], 'message', async (bot, message) => {
        await bot.reply(message, 'That is not my problem.');
    })

    controller.hears(['i have a warranty', 'warranty'], 'message', async (bot, message) => {
        await bot.reply(message, 'did you break something? Do you want to return something?');
        context.isWarranty = true;
    })

    if (context.isWarranty == true){
        controller.hears('yes', 'message', async (bot, message) => {
            await bot.reply(message, 'Send the item with the warranty to your nearest Amway facility. If you are unsure, tell me which country you are from, i will try to send all the available facilities in your country.');
            context.isWarranty = false;
        })

        controller.hears('no', 'message', async (bot, message) => {
            await bot.reply(message, 'Then why are you telling me this?');
            context.isWarranty = false;
        })

        controller.hears('', 'message', async (bot, message) => {
            context.isWarranty = false;
        })
    }

    
}
