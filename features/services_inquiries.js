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

    controller.hears('what can you do', 'message', async (bot, message) => {
        await bot.reply(message, `I am a chatbot titled ${context.botName} with the insufferable personality of Brian from RST2 Group 4.`)
        await bot.reply(message, 'I am able to have a painful conversation with you as well as recommend and provide you with information on certain products.');
        await bot.reply(message, {
            text: "I am also well equipped with many fun facts! Do have a hear!",
            quick_replies: [
                {
                    title: "Fun Fact",
                    payload: "Give me a fun fact!"
                },
                {
                    title: "Products",
                    payload: "Show me your products!"
                },
                {
                    title: "Cancel",
                    payload: "Let me explore around a bit"
                }
            ]
        });
    })
}
