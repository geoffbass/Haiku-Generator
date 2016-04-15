var dict = require('./parser.js').cmudict,
	createHaiku = require('./haiku_generator.js'),
	userInput = require('./user_input');

userInput.getStructure(userInput.haikuStructure);
var structure = userInput.haikuStructure;

userInput.eventEmitter.on('haiku ready', function() {
	console.log(createHaiku(dict, structure));
});