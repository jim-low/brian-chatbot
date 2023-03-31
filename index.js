// link for reference: https://stormotion.io/blog/how-to-make-a-chatbot-using-js/#:~:text=In%20order%20to%20implement%20a,good%20choice%20for%20this%20task.

import { NlpManager } from "node-nlp";
import { createInterface } from "readline";
import defaults from "./bot/defaults.js"

const manager = new NlpManager({ languages: ["en"] });
manager.load();

var rl = createInterface(process.stdin, process.stdout);

console.log(`Welcome! Have a chat with ${defaults.botName}.`);

rl.setPrompt("You: ");
rl.prompt();
rl.on("line", async function (line) {
    const response = await manager.process("en", line);
    console.log("Brian: " + response.answer);
    console.log();
    rl.prompt();
}).on("close", function () {
    process.exit(0);
});
