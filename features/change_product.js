module.exports = function(controller) {
    controller.hears(['i would like to change products', 'change product'], 'message', async (bot, message) => {
        await bot.reply(message, 'Our terms does not allow users to trade or convert purchased products.');
    })
}
