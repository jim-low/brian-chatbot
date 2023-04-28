module.exports = function(controller) {
    // TODO: add specific response for:
    // 1. refund
    // 1.1 100% satisfaction
    // 2. warranty
    // 3. what is illegal and what is not

    controller.hears(/terms and conditions/gi, 'message', async (bot, message) => {
        await bot.reply(message, 'Here are our terms and conditions, nerd');
        await bot.reply(message, '- Items purchased are not refundable or exchangable for other products.');
        await bot.reply(message, '- The organization will not be liable of any damages following the product after the warranty duration');
        await bot.reply(message, `----------------------------------------------------------------------------------------------------------<br>
            <h1 style="color: red;">The chatbot holds no responsibility for any possible mental damages, if you are offended over a chatbot you should get some help.</h1>
            ----------------------------------------------------------------------------------------------------------<br>`);
        await bot.reply(message, '- If the warranty is lost or damaged, the product is not available for repair, return, or refund.');
        await bot.reply(message, '- A fine or jail time will be imposed if users are caught with illegitamate warranties, such as a photocopy');
        await bot.reply(message, '- Warranty times are not extendable nor negotiable');
        await bot.reply(message, '- Products displayed may update in the near future. As the chatbot is still in development');
    })
}
