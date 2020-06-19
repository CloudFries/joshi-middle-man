const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'help',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      if(args[0]) return message.reply("Invalid formatting!")
      
      const embed = new MessageEmbed()
      .setTitle("Help For Members+ Middle Man!")
      .setDescription("Prefix: $")
      .setColor("BLUE")
      .addField("$trade (user mention)", "Look for a middle man to trade with another user")
      .addField("$close", "Delete the ticket")
      .addField("$archive", "Let admins view the ticket after it's done")
      .addField("$claim", "Claim the ticket for yourself!")
      .addField("$unclaim", "Unclaim the current ticket")
      .addField("$invite", "Add the bot to your server")
      .addField("$botinfo", "Information about the bot")
      .addField("$support", "Join the support server")
      message.channel.send(embed)
    }
}