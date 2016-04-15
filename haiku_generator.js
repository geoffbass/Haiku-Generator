var getWord = require('./get_word.js');

function createHaiku(dict, structure) {
	var haiku = '\n';
	for (var i = 0, x = structure.length; i < x; i++) {
		for (var j = 0, y = structure[i].length; j < y; j++) {
   			haiku += getWord(dict[structure[i][j]], structure[i][j]).replace(/[\d\(\)]/g, '') + ' ';
		}
		haiku += '\n';
	}
	return haiku;
}

module.exports = createHaiku;