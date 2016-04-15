var events = require('events'),
	readline = require('readline')
	rl = readline.createInterface({
  		input: process.stdin,
  		output: process.stdout
		}),
	haikuStructure = [],
	eventEmitter = new events.EventEmitter();
	

var getNextLine = function(currentStructure, lineNum) {
	var totalSyllables,
		exampleArray;

	if (lineNum % 2 === 0) {
		totalSyllables = 7;
		exampleArray = '2, 3, 2';
	} else {
		totalSyllables = 5;
		exampleArray = '2, 3';
	}

	rl.question('\nPlease enter the number of syllables ' 
				+ 'for each word in line ' + lineNum 
				+ '\nBe sure it adds up to ' + totalSyllables + ' syllables'
				+ '\nExample: ' + exampleArray + '\n', function(answer) {
		rl.pause();
		try {
			line = answer.match(/\d/g).map(function(str) {
				return +str;
			});
			if (line.reduce(function sum(a, b) {
					return a + b;
				}) !== totalSyllables) {
				console.log("\nInvalid input: make sure you have " + totalSyllables 
					+ " total syllables");
				getNextLine(currentStructure, lineNum);
			} else {
				currentStructure.push(line);
				getStructure(currentStructure);
			}
		} catch (err) {
			console.log("\nInvalid input: numbers only please!");
			getNextLine(currentStructure, lineNum);
		}
	});
}

var getStructure = function(currentStructure) {
	if (currentStructure.length >= 3) {
		setStructure(currentStructure);
		eventEmitter.emit('haiku ready');
	} else {
		getNextLine(currentStructure, currentStructure.length + 1);
	}
}

var setStructure = function(structure) {
	haikuStructure = structure;
	// eventEmitter.emit('haiku ready');
}


module.exports = {
	haikuStructure: haikuStructure,
	eventEmitter: eventEmitter,
	getStructure: getStructure
};