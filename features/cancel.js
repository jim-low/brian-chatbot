const context = require('../bot/botkit/context');
const natural = require('natural')
const classifications = require('../bot/botkit/classifications');
const getIntent = require('../bot/botkit/getIntent');

module.exports = function(controller) {
    controller.hears(message => getIntent(message.text, classifications.inquiries.cancel),
    'message', async (bot, message) => await bot.reply(message, "Alright. Do let me know if there is anything i can help with."));

}
