const encrypt = require('crypto-js/sha3');
const cache = require('system-cache');
const managerCache = new cache();
const admin = require("firebase-admin");
const serviceAccount = require("./firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "your url database"
});
const db = admin.database();
const ref = db.ref();
const servidores = ref.child('data');

managerCache.setOptions({
	regist: true,
	execFunction: async () => {
		return servidores.once('value', (data) => {
			return data.toJSON();
		})
	}
})

async function startDB(){
	if(!managerCache.cache.base){
		let dataGet = await managerCache.options.execFunction();
		let data_json = dataGet.toJSON();
		managerCache.setCache(data_json);
		return data_json;
	}else {
		managerCache.clearCache()
		return managerCache.cache.base;
	}
}

function setDB(data){
	managerCache.cache.base = data;
	servidores.set(data);
}

module.exports.guilds = async (guildID) => {
	let data = await startDB();
	if(!data.servidores[guildID]){
		data.servidores[guildID] = {
			id: guildID,
			users: {},
			tickets: {},
			staff: null,
			commands: {},
			disable_commands: {},
			economy: true,
			strikes_limit: 5,
			prefix: "a;"
		}
		setDB(data);
		return data.servidores[guildID];
	}else {
		return data.servidores[guildID]
	}
}

module.exports.user = async (guildID, userID) => {
	let data = await startDB();
	let server = await module.exports.guilds(guildID);
	if(!server.users[userID]){
		server.users[userID] = {
			balance: 0,
			xp: 0,
			mensajes: 0,
			xpnext: 231,
			ban: 0,
			kick: 0,
			mute: 0,
			warn: 0,
			strikes: 0,
			bank: 0,
			bitcoin: 0.1,
			id: userID
		}
		data.servidores[server.id] = server;
		setDB(data);
		return server.users[userID];
	}else {
		return server.users[userID];
	}
}

module.exports.setGuild = async (guild) => {
	let data = await startDB();
	data.servidores[guild.id] = guild;
	setDB(data);
}