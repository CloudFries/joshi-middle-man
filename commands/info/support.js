const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'support',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
        let sEmbed = new MessageEmbed()
        .setAuthor(message.author.username)
        .setColor("#ff0000")
        .setTitle("Click here to join the\nsupport server!")
        .setURL("https://discord.gg/7jAwXRj");
      
        message.channel.send(sEmbed);
    }
}