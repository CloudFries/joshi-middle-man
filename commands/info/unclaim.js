const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'unclaim',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      
      if (message.channel.parent.name !== "Tickets") return message.reply("You can only use this command on tickets!");
      
        const support = message.guild.roles.cache.find(role => role.name === "Ticket Staff")
        
        let role = database.get(`staff_${message.guild.id}`)
  let backup = message.guild.roles.cache.find(role => role.name === "Ticket Staff");
  if(role === null || 0) return message.reply("This guild does not have it's support role set!")
  if(!message.member.roles.cache.has(role)) return message.reply("You do not have the staff role!")
        
        message.channel.updateOverwrite(message.author, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
        });
        message.channel.updateOverwrite(support, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
        });
      
      message.reply("You have successfully unclaimed this ticket!")
      
    }
}