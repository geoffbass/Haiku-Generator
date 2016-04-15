var fs = require("fs");
var cmudictFile = readCmudictFile('./cmudict.txt');

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}


//store words in an object that has numbered 
//properties, each holding an array of all the 
//words with that number of syllables
function dictFileToObj (dictFile) {
	var lines = cmudictFile.split('\n'),
		obj = {
			'1': [],
			'2': [],
			'3': [],
			'4': [],
			'5': [],
			'6': [],
			'7': []
		},
		syllables,
		lineSplit;

	lines.forEach(function(line) {
		lineSplit = line.split("  ");
		try {
			syllables = lineSplit[1].match(/\d/g).length;
		} catch (err) {
			syllables = 0;
		}
		if (syllables > 0 && syllables < 8) {
			obj[syllables].push(lineSplit[0]);
		}
	});
	return obj;
}

module.exports = {
	cmudict: dictFileToObj(cmudictFile),
	convert: dictFileToObj
};