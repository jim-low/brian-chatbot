module.exports = function(controller) {
    controller.hears('i would like to change products', 'message', async (bot, message) => {
        await bot.reply(message, 'well too bad, you\'re keeping it');
    })
}
