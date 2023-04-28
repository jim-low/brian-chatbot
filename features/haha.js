const { BotkitConversation } = require('botkit');
const nlp = require('compromise')

module.exports = function (controller) {
    // define the conversation
    const onboarding = new BotkitConversation('onboarding', controller);
    
    onboarding.say('Hello human!');
    // collect a value with no conditions
    onboarding.ask('What is your name?', async(answer, convo) => {
        convo.vars.name = nlp(answer).match("#FirstName").text()
    }, {key: 'name'});
    
    // collect a value with conditional actions
    onboarding.ask('Do you like tacos?', [
        {
            pattern: 'yes',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('likes_tacos');
            }
        },
        {
            pattern: 'no',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('hates_life');
            }
        }
    ],{key: 'tacos'});
    
    // define a 'likes_tacos' thread
    onboarding.addMessage('HOORAY TACOS {{vars.name}}', 'likes_tacos');
    
    // define a 'hates_life' thread
    onboarding.addMessage('TOO BAD!', 'hates_life');
    
    // handle the end of the conversation
    onboarding.after(async(results, bot) => {
        const name = results.name;
    });
    
    // add the conversation to the dialogset
    controller.addDialog(onboarding);
    
    // launch the dialog in response to a message or event
    controller.hears('hello me', 'message', async(bot, message) => {
        await bot.changeContext(message.reference)
        bot.beginDialog('onboarding');
    });
}