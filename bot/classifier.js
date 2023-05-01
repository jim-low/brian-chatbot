const { PorterStemmer, BayesClassifier } = require("natural")
const classifier = new BayesClassifier();
const classifications = require("./botkit/classifications")
const dataset = require("./botkit/small-talk-dataset.json")

// // small_talk without name
// let sentences = ["hello", "hi", "hey"];
// sentences.forEach(sentence => {
//     classifier.addDocument(PorterStemmer.tokenizeAndStem(sentence), classifications.small_talk.hello);
// })

// // small_talk -> "nice to meet you" kind
// sentences = [
//     "nice to meet you",
//     "how do you do",
//     "pleasure to meet you",
//     "pleased to meet you",
//     "good morning",
//     "good afternoon",
// ];
// sentences.forEach(sentence => {
//     classifier.addDocument(PorterStemmer.tokenizeAndStem(sentence), classifications.small_talk.hello);
// })

// // small_talk with name
// sentences = [
// ];
// sentences.forEach(sentence => {
//     classifier.addDocument(PorterStemmer.tokenizeAndStem(sentence), classifications.small_talk.hello);
// })

// // small_talk - bot introduction
// sentences = [
//     "who are you",
//     "what are you",
//     "what can you do",
//     "introduce yourself",
//     "what can you do",
//     "what do you do",
//     "what is this",
// ];
// sentences.forEach(sentence => {
//     classifier.addDocument(PorterStemmer.tokenizeAndStem(sentence), classifications.small_talk.hello);
// })

dataset.data.forEach(foo => {
    console.log(foo.intent)
    foo.sentences.forEach(sentence => {
        console.log(sentence)
        classifier.addDocument(PorterStemmer.tokenizeAndStem(sentence), foo.intent)
    })
    console.log()
    console.log()
})

console.log("Trained!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
classifier.train();

module.exports = classifier
