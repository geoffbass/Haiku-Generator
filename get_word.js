//use random number generator to retrieve a word
//with a specific number of syllables from a 
//random index of the appropriate array
function getRandomWord(dict, syllables) {
	var numWords = dict.length;
		wordIndex = 0;

	wordIndex = Math.floor(Math.random() * numWords);
	return dict[wordIndex];
}

module.exports = getRandomWord;