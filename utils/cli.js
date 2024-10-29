const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	clear: {
		type: `boolean`,
		default: false,
		alias: `c`,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	},
	edit: {
		type: `boolean`,
		alias: `e`,
		desc: `edit the config of the sdfsd tool`
	},
	help: {
		type: `boolean`,
		alias: `h`,
		desc: `Print this help`
	}
};

const commands = {
	create: { desc: `create the deploy script for the script` },
	config: { desc: `show configuration` },
	help: { desc: `Print help info` }
	// sdfsd: { desc: `some text ` }
};

const helpText = meowHelp({
	name: `sdfsd`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
