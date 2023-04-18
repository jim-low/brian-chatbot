module.exports = function(controller) {
    controller.hears('i would like the 100% refund', 'message', async (bot, message) => {
        await bot.reply(message, 'no lol');
    })
}
