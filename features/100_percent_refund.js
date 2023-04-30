const context = require('../bot/botkit/context.js');
const nlp = require('compromise')

module.exports = function(controller) {
    controller.hears('i would like the 100% refund', 'message', async (bot, message) => {
        await bot.reply(message, 'please refer to our terms and conditions.');
    })

    controller.hears(message => {
        const doc = nlp(message.text);

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

    


   



    

    
}
