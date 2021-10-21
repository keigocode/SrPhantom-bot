module.exports = {
	value: ['help', 'ayuda'],
	description: "Revisa el estado de ayuda de el bot.",
	category: "helper",
	func: (bot, message) => {
		let helping = bot.embed({
			title: "Automata",
			description: "Soy un bot dedicado a tu servidor, registros, moderación, sugerencias, tickets, economia, licencias, encrypt."
		});
		message.reply({embeds: [helping]})
	}
}