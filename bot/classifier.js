const { PorterStemmer, BayesClassifier, SentimentAnalyzer, WordTokenizer } = require("natural")
const classifier = new BayesClassifier();
const classifications = require("./botkit/classifications")
const dataset = require("./botkit/small-talk-dataset.json")
const Tokenizer = new WordTokenizer();
const Analyzer = new SentimentAnalyzer("English", PorterStemmer, "afinn");

dataset.data.forEach(foo => {
    foo.sentences.forEach(sentence => {
        classifier.addDocument(sentence, foo.intent)
        classifier.addDocument(PorterStemmer.tokenizeAndStem(sentence), foo.intent)
        classifier.addDocument(PorterStemmer.tokenizeAndStem(sentence).join(' '), foo.intent)
    })
})

console.log("Trained!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
classifier.train();

module.exports = classifier
