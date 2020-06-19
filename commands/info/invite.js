const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'invite',
    category: 'info',
    description: 'Invite the bot to your server',
    run: async(bot,message,args)=>{
        if (args[0]) return message.reply("You may not do that!");
  let iEmbed = new MessageEmbed()
  .setAuthor(message.author.tag)
  .setTitle("Click here to add Members+ Middle Man Bot to your server!")
  .setURL("https://discord.com/oauth2/authorize?client_id=718859980869992482&scope=bot&permissions=8")
  .setColor("RED");

  message.channel.send(iEmbed);
    }
}