const {MordeKayh, Intents} = require('mordekayh.js');
const bot = new MordeKayh({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const {guilds, user, setGuild} = require('./database.js');
const {leveling} = require('./utils.js');

bot.on('ready', () => {
	console.log(`${bot.user.username}#${bot.user.discriminator}`);
	bot.commandHandler('./comandos');
})

bot.on('messageCreate', async (message) => {
	let init = message.content.split(' ', 1)[0];
	let server = await guilds(message.guild.id);
	let usuario = await user(message.guild.id, message.author.id);
	usuario = leveling(init, server, usuario, message);
	server[usuario.id] = usuario;
	setGuild(server);

	if(!init.startsWith(server.prefix)) return;

	let command = bot.getCommand(init.slice(server.prefix.length));
	if(!command) return;

	command.func(bot, message, server, usuario);
});

bot.login('ODc4NDgxODMyMjIyNTQ3OTk4.YSBz9g.e921UtV4KS6Fded7iRP4zDjyAFY');