module.exports = {
	value: ['me', 'yo', 'userinfo', 'user'],
	description: "Mira tu información o la de alguien mas.",
	category: "helper",
	func: (bot, message, servidor, usuario) => {
		let init = message.content.split(' ', 1)[0];
		let mention = message.mentions.users.first();
		let exec_mention = mention ? mention.id : message.content.slice(init.length + 1);
		let memberMention = message.guild.member(exec_mention);
		if(!exec_mention){
			message.reply({embeds: [bot.embed({
				title: `Usuario ${message.author.tag}`,
				description: ``,
			})], mention: false})
		}
	}
}