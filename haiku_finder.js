var fs = require('fs'),
	parser = require('./parser.js'),
	dict = parser.cmudict;

function createDictionary(dictObj) {
	var dictionary = {};
	for (var i = 1; i <= 7; i++) {
		for (var j = 0, x = dictObj[i].length; j < x; j++) {
			dictionary[dictObj[i][j]] = i;
		}
	}
	return dictionary;
}


//check each word in the text and get the number of syllables it has
//
//if a group of successive words adds up to 5 syllables, start the process
//again with the next word and check to see if more words add up to 7 syllables,
//then finally 5 again
function findHaikus(text) {
	var textWords = fs.readFileSync(text).toString().replace(/[^a-z\s]/ig, '').split(/\s/),
		totalSyllables,
		wordsAway,
		syllablesByWord = createDictionary(dict),
		currentHaiku = '',
		haikus = '';

	textWords = textWords.filter(function(item) {
		return item !== '';
	});

	for (var i = 0, x = textWords.length - 1000; i < x; i++) {
/*OPTIONAL*/if (textWords[i].charAt(0) !== textWords[i].charAt(0).toUpperCase()) {
/*OPTIONAL*/	continue;
/*OPTIONAL*/}

		currentHaiku = textWords[i];
		totalSyllables = syllablesByWord[textWords[i].toUpperCase()] || 8;
		wordsAway = 0;

		while (totalSyllables < 5) {
			wordsAway++;
			totalSyllables += syllablesByWord[textWords[i + wordsAway].toUpperCase()] || 8;
			currentHaiku += ' ' + textWords[i + wordsAway];
		}
		if (totalSyllables > 5) {
			continue;
		}

		wordsAway++;
		currentHaiku += '\n' + textWords[i + wordsAway];
		totalSyllables = syllablesByWord[textWords[i + wordsAway].toUpperCase()] || 8;
		while (totalSyllables < 7) {
			wordsAway++;
			totalSyllables += syllablesByWord[textWords[i + wordsAway].toUpperCase()] || 8;
			currentHaiku += ' ' + textWords[i + wordsAway];
		}
		if (totalSyllables > 7) {
			continue;
		}

		wordsAway++;
		currentHaiku += '\n' + textWords[i + wordsAway];
		totalSyllables = syllablesByWord[textWords[i + wordsAway].toUpperCase()] || 8;
		while (totalSyllables < 5) {
			wordsAway++;
			totalSyllables += syllablesByWord[textWords[i + wordsAway].toUpperCase()] || 8;
			currentHaiku += ' ' + textWords[i + wordsAway];
		}
		if (totalSyllables > 5) {
			continue;
		}

		haikus += currentHaiku + '\n\n';
	}
	return haikus;
}
fs.writeFileSync('./haiku_found_for_' + process.argv[2], findHaikus(process.argv[2]));