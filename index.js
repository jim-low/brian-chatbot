// link for reference: https://stormotion.io/blog/how-to-make-a-chatbot-using-js/#:~:text=In%20order%20to%20implement%20a,good%20choice%20for%20this%20task.

// just some code to let the model train itself
const { NlpManager } = require('node-nlp');
const prompts = require("prompts")
const modes = require("./bot/modes.js")
const defaults = require("./bot/defaults.js")

const manager = new NlpManager({ languages: ['en'], forceNER: true, nlu: { log: false } });
// Adds the utterances and intents for the NLP

// hello
manager.addDocument('en', 'hello', modes.greeting.hello);
manager.addDocument('en', 'hi', modes.greeting.hello);
manager.addDocument('en', 'howdy', modes.greeting.hello);

manager.addAnswer('en', modes.greeting.hello, 'Hey there!');
manager.addAnswer('en', modes.greeting.hello, '...');
manager.addAnswer('en', modes.greeting.hello, 'fuck u');

// bye
manager.addDocument('en', 'goodbye for now', modes.greeting.bye);
manager.addDocument('en', 'bye bye take care', modes.greeting.bye);
manager.addDocument('en', 'okay see you later', modes.greeting.bye);
manager.addDocument('en', 'bye for now', modes.greeting.bye);
manager.addDocument('en', 'i must go', modes.greeting.bye);
manager.addDocument('en', 'screw u', modes.greeting.bye);

manager.addAnswer('en', modes.greeting.bye, 'Till next time');
manager.addAnswer('en', modes.greeting.bye, 'Your suffering never ends');
manager.addAnswer('en', modes.greeting.bye, 'no u');

// deeznuts
manager.addDocument('en', 'who is diz?', modes.jokes.deeznuts);
manager.addDocument('en', 'who is candice?', modes.jokes.deeznuts);
manager.addDocument('en', 'what stairs?', modes.jokes.deeznuts);

manager.addAnswer('en', modes.jokes.deeznuts, 'He is Diz NUTZZZZZZ');
manager.addAnswer('en', modes.jokes.deeznuts, 'Candice NUTZZZZZZZZZZ FIT IN UR MOUTH');
manager.addAnswer('en', modes.jokes.deeznuts, 'Stair AT DEEZ NUTZZZZZZZZZZZ');

async function getResponse(humanInput) {
    await manager.train()
    manager.save()

    const result = await manager.process('en', humanInput);
    const answers = result.answers;
    const randomIndex = Math.floor(Math.random() * answers.length);
    const response = answers[randomIndex]?.answer || defaults.didNotUnderstand;
    return {
        answer: response,
        intent: result.intent
    };
}

console.log(`Welcome! Have a chat with ${defaults.botName}`);

// main function
(async() => {
    while (true) {
        const humanInput = await prompts({
            type: "text",
            name: "input",
            message: "You: "
        });

        const response = await getResponse(humanInput.input);
        console.log("Brian: " + response.answer);
        console.log();

        if (response.intent == modes.greeting.bye) {
            break;
        }
    }
})();
