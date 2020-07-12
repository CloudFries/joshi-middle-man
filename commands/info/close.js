const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
module.exports={
    name: 'close',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
            let ticketCat = database.get(`tickets_${message.guild.id}`)
      
      if (message.channel.parentID !== ticketCat) {
        return message.channel.send(errorEmbed.setDescription("This command can only be used in tickets!"))
}
      message.channel.delete();
    }
}
