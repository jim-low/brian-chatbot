const context = require('../bot/botkit/context');
const natural = require('natural')
const classifications = require('../bot/botkit/classifications');
const getIntent = require('../bot/botkit/getIntent');

module.exports = function(controller) {
    controller.hears(message => getIntent(message.text, classifications.inquiries.changeProduct), 'message', async (bot, message) => {
        await bot.reply(message, 'Our terms does not allow users to trade or convert purchased products.');
    })
}
