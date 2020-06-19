const {MessageEmbed} = require('discord.js');
const database = require('quick.db');
const userTickets = new Map();
module.exports={
    name: 'trade',
    category: 'info',
    description: 'text here',
    run: async(bot,message,args)=>{
      
      let supportCategory = message.guild.channels.cache.find(category => category.name === "Tickets")
      
      const trader = message.mentions.members.first()
      if(!trader) return message.reply("**Please mention someone to trade!**")
      if(args[1]) return message.reply("Invalid formatting!")
      
      if (message.guild.me.permissions.has('MANAGE_CHANNELS') && !supportCategory) {
        supportCategory = await message.guild.channels.create('Tickets', {
          type: 'category',
          
        });
      };
      
      if (!message.guild.me.permissions.has("MANAGE_CHANNELS") && !supportCategory) {
        message.channel.send(`Sorry but I do not have permission to create a category!`)
      }
      
      if (!message.guild.roles.cache.find(role => role.name === "Ticket Staff")) {
        await (message.guild.roles.create({
          name: 'Ticket Staff',
          color: 'BLUE',
        }));
      };
      
      const supportrole = message.guild.roles.cache.find(role => role.name === "Ticket Staff")
      
      if (!supportrole) {
        return message.channel.send(`There is no support team role! Please create a role named "Ticket Staff"`)
      }
      
      const ticketAmt = database.get(`tickets_${message.guild.id}`)
      
      let channelName = `ticket-${message.author.username}-${message.author.discriminator}`.toLowerCase()
      channelName = channelName.replace(/ /g, '-')
      channelName = channelName.replace(/\W/g, '')
      
      if(message.guild.channels.cache.some(channel =>
          channel.name.toLowerCase() === channelName)) { 
        message.reply("**You already have a ticket open!**")
      } else {
      
      console.log(channelName)
      
      message.guild.channels.create(channelName, { parent: supportCategory.id, topic: `Ticket Owner: <@${message.author.id}>` }).then(c => {
        const sr = message.guild.roles.cache.find(role => role.name === "Ticket Staff")
        const everyone = message.guild.roles.cache.find(role => role.name === "@everyone")
      //   userTickets.set(message.author.id, c.id)
      //   if(userTickets.has(message.author.id)) {
      //   message.channel.send("**You already have a ticket open!**");
      // }
        c.updateOverwrite(sr, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
        });
        c.updateOverwrite(everyone, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
        });
        c.updateOverwrite(message.author, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
        });
        c.updateOverwrite(trader, {
          SEND_MESSAGES: true,
          VIEW_CHANNEL: true,
        });
        
        let embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Ticket Created")
        .setDescription(`<@${message.author.id}> Your support ticket channel is <#${c.id}>`)
        .setTimestamp()
        .setFooter("Made by Cloud")
        message.channel.send(embed)
        
        let wEmbed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle("Members+ Middle Man")
        .setDescription("**__Thanks for opening a ticket! Support will be with you shortly.__**\n\n- What are you trading?\n- What is the price?")
        .addField("Ticket Owner:", `<@${message.author.id}>`)
        .setTimestamp()
        .setFooter("Made by Cloud")
        c.send(`${message.author}, ${trader}, here is your ticket!`)
        c.send(wEmbed)
        
        database.add(`tickets_${message.guild.id}`, 1)
        
      }).catch(console.error);
      }
      
    }
}