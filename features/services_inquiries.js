module.exports = function(controller) {
    controller.hears(['what products do you have', 'show me your products'], 'message', async (bot, message) => {
        await bot.reply(message, {
            text: "What would you like to see?",
            quick_replies: [
                {
                    title: "Home Care",
                    payload: "Home Care"
                },
                {
                    title: "Wellness",
                    payload: "Wellness"
                },
                {
                    title: "Electrical Appliances",
                    payload: "Electrical Appliances"
                },
                {
                    title: "Kitchenware",
                    payload: "Kitchenware"
                },
                {
                    title: "Vacuum",
                    payload: "Vacuum"
                },
                {
                    title: "Cooking",
                    payload: "Cooking"
                },
            ]
        })
    })

    controller.hears(['do you have warranty', 'how long is your warranty'], 'message', async (bot, message) => {
        await bot.reply(message, 'this feature is not implemented yet');
    })

    controller.hears(['what are your working hours', 'working hours', 'what hours do you work', 'when are you available', 'what times are you available'], 'message',
        async (bot, message) => {
            await bot.reply(message, 'I am currently only available when my server is enabled manually.');
            await bot.reply(message, 'However, if in the future a server was dedicated to me. I would be available all the time.');
        })
}