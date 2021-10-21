function leveling(init, server, usuario, message){
	usuario.mensajes = usuario.mensajes + 1;
	usuario.xp += Math.floor(message.content.length / 2);
	if(usuario.xp >= usuario.xpnext){
		usuario.level = usuario.level + 1;
		usuario.xp = 0;
		usuario.xpnext = usuario.level * 231;
		server.users[message.author.id] = usuario;
	}
	return usuario;
}

module.exports = {leveling};