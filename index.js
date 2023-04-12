// link for reference: https://stormotion.io/blog/how-to-make-a-chatbot-using-js/#:~:text=In%20order%20to%20implement%20a,good%20choice%20for%20this%20task.

import { dockStart } from '@nlpjs/basic'; // this import is useless, but it makes our file look interesting, so lets keep it here
import { NlpManager } from 'node-nlp';
import { createInterface } from 'readline';
import { readFileSync } from "fs"

const rl = createInterface(process.stdin, process.stdout);

const data = readFileSync('model.nlp', 'utf8')
const manager = new NlpManager();
manager.import(data);

console.clear()

const context = {}; // put context here to remember variables
rl.setPrompt("You: ");
rl.prompt();
rl.on("line", async function (line) {
    const response = await manager.process("en", line, context);
    console.log(`Bot: ${response.answer}`);
    console.log(response.intent);
    console.log(context);
    console.log()
    rl.prompt()
}).on("close", function () {
    process.exit(0);
});
