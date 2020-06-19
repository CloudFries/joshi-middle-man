//Requirements
const express = require("express");
const app = express();

app.use(express.static("public"));
app.get("/", (request, response) => {
  console.log("🏓 " + Date.now() + " Website Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
const database = require('quick.db');
const botconfig = require("./botconfig.json");
const { MessageEmbed, Collection, Client } = require("discord.js");
const { VultrexDB } = require("vultrex.db");
const bot = new Client();
const config = require("./botconfig.json");
const fs = require("fs");
bot.commands = new Collection();
bot.aliases = new Collection();
bot.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(bot);
});

//Bot is online message/status
bot.on("ready", async () => {
  console.log(
    `${bot.user.username} is online on ${bot.guilds.cache.size} servers!`
  );
  bot.user.setActivity(`Middle Man Bot!`, { type: "PLAYING" });
});

bot.on(`message`, async message => {
  let prefix = "$"
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.guild) return message.reply(`<@${message.author.id}>, I cannot repond to commands in DMs`);
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = bot.commands.get(cmd);
  if (!command) command = bot.commands.get(bot.aliases.get(cmd));
  if (command) command.run(bot, message, args);
});
  const token = process.env.DISCORD_TOKEN;
  bot.login(token);