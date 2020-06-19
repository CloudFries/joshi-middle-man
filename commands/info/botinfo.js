const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'botinfo',
    category: 'info',
    description: 'Says information about the bot',
    run: async(bot,message,args)=>{
        if (args[0]) return message.reply("You may not do that!");
        let bicon = bot.user.displayAvatarURL();
        let botembed = new MessageEmbed()
        .setDescription("***Bot Information***")
        .setColor("RANDOM")
        .setThumbnail(bicon)
        .setFooter(message.createdAt)
        .addField("Bot Name", bot.user.username, true)
        .addField("Created On", bot.user.createdAt, true)
        .addField("Developers:", "Developer: <@290143878315507712>", false)
        .addField("Discord.js Version:", "v12.2.0",)
        .addField("Total Guilds:", `${bot.guilds.cache.size}`,)
        .addField("Total Users:", `${bot.users.cache.size}`,)
        .addField("Join The Support Server", "[Click Here](https://discord.gg/VSHD5qP)")
        .addField("Invite The Bot To Your Server", "[Click Here](https://discord.com/api/oauth2/authorize?client_id=718804515876372561&permissions=8&scope=bot)");
      
        message.channel.send(botembed);
    }
}