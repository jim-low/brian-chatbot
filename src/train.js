import { dockStart } from '@nlpjs/basic';
import { readdirSync, readFileSync } from "fs";

async function train_save(manager) { // train and save manager instance
    await manager.train();
    const minified = true;
    const data = manager.export(minified);
    manager.save()
}

(async () => {
    const dock = await dockStart({
        settings: {
            nlp: {
                forceNER: true,
                languages: ['en'],
                executeActionsBeforeAnswers: true,
            },
        },
        use: ['Basic', 'LangEn']
    });
    const manager = dock.get('nlp');
    const files = readdirSync("./intents"); // read intent files in intents folder

    for (const file of files) {
        let data = readFileSync(`./intents/${file}`)
        data = JSON.parse(data)
        const intent = file.replace(".json", "")

        for (const utterance of data.utterances) {
            manager.addDocument('en', utterance, intent);
        }

        for (const answer of data.answers) {
            manager.addAnswer('en', intent, answer)
        }

        // TODO: add word conditions to extract context
    }

    manager.addNerAfterLastCondition('en', 'name', ['am', 'im', 'name is']);

    manager.addDocument('en', 'i am @age years old', 'greetings.age');
    manager.addAnswer('en', 'greetings.age', 'good to know you are {{number}} years old'); // use number because i dont know how else to make it right
    manager.addNerBeforeFirstCondition('en', 'age', ['years old', 'years']);

    manager.addDocument('en', 'You will be named @botName', 'yourName.assign');
    manager.addDocument('en', 'Your name is @botName', 'yourName.assign');
    manager.addAnswer('en', 'yourName.assign', 'Okay, i will be named {{botName}}.'); // use number because i dont know how else to make it right
    manager.addNerAfterLastCondition('en', 'botName', ['name is', 'named']);

    manager.addDocument('en', 'What is your name?', 'yourName.inquire');
    manager.addAnswer('en', 'yourName.inquire', 'My name is {{botName}}');

    // manager.addAction('yourName.inquire', 'handleBotName', [], async (data) => {
    //     data.context.botName = data.context.botName
    //     return data;
    // })

    train_save(manager);
})();
