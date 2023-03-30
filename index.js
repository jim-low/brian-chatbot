// link for reference: https://stormotion.io/blog/how-to-make-a-chatbot-using-js/#:~:text=In%20order%20to%20implement%20a,good%20choice%20for%20this%20task.

// just some code to let the model train itself
const { NlpManager } = require('node-nlp');
const prompts = require("prompts")

const manager = new NlpManager({ languages: ['en'], forceNER: true, nlu: { log: false } });
// Adds the utterances and intents for the NLP

// greetings.hello
manager.addDocument('en', 'hello', 'greetings.hello');
manager.addDocument('en', 'hi', 'greetings.hello');
manager.addDocument('en', 'howdy', 'greetings.hello');

manager.addAnswer('en', 'greetings.hello', 'Hey there!');
manager.addAnswer('en', 'greetings.hello', 'Greetings!');

// greetings.bye
manager.addDocument('en', 'goodbye for now', 'greetings.bye');
manager.addDocument('en', 'bye bye take care', 'greetings.bye');
manager.addDocument('en', 'okay see you later', 'greetings.bye');
manager.addDocument('en', 'bye for now', 'greetings.bye');
manager.addDocument('en', 'i must go', 'greetings.bye');
manager.addDocument('en', 'screw u', 'greetings.bye');

manager.addAnswer('en', 'greetings.bye', 'Till next time');
manager.addAnswer('en', 'greetings.bye', 'see you soon!');
manager.addAnswer('en', 'greetings.bye', 'no u');

// personality.deeznut
manager.addDocument('en', 'who is diz?', 'personality.deeznut');
manager.addDocument('en', 'who is candice?', 'personality.deeznut');
manager.addDocument('en', 'what stairs?', 'personality.deeznut');

manager.addAnswer('en', 'personality.deeznut', 'He is Diz NUTZZZZZZ');
manager.addAnswer('en', 'personality.deeznut', 'Candice NUTZZZZZZZZZZ FIT IN UR MOUTH');
manager.addAnswer('en', 'personality.deeznut', 'Stair AT DEEZ NUTZZZZZZZZZZZ');

async function getResponse(humanInput) {
    await manager.train()
    manager.save()

    const result = await manager.process('en', humanInput)
    const answers = result.answers
    const randomIndex = Math.floor(Math.random() * answers.length)
    const response = answers[randomIndex]?.answer || "Sorry, dumbass say what?"
    return {
        answer: response,
        intent: result.intent
    }
}

console.log("Welcome! Have a chat with Brian the Insufferable");

// main function
(async() => {
    while (true) {
        const humanInput = await prompts({
            type: "text",
            name: "input",
            message: "You: "
        })

        const response = await getResponse(humanInput.input)
        console.log("Brian: " + response.answer)
        console.log()

        if (response.intent == 'greetings.bye') {
            break
        }
    }
})()
