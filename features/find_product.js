module.exports = function(controller) {
    controller.hears(['i want to look for a product', 'look for products', 'look at your products'], 'message', async (bot, message) => {
        await bot.reply(message, 'well you can LOOK AT DEEZ NUTZZZZZZZ');
        await bot.reply(message, 'anyway, unfortunately i cannot help you with the details of our company products, I am an after-sales bot. If you wish to purchase items. You can refer to our site.');
        await bot.reply(message, `<a href="https://www.amway.my/">Our Website</a>`);
    })
}
