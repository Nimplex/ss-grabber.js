const { Client, MessageEmbed } = require('discord.js')
const fetch              = require('node-fetch')      
const { token, prefix }  = require('../config')
const { floor, random }  = Math

const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'w', 'y', 'z']
const client = new Client()

client.once('ready', () => console.log(`${client.user.tag} is ready!`))
client.on('message', async message => {
  if (!message.content.startsWith(prefix) || !message.guild || message.author.bot) return
  if (message.content.toLowerCase().startsWith(`${prefix}randompic`)) {
    let id = '';
    for (let i=0; i<4; ++i) id+=characters[floor(random()*characters.length)]
    for (let i=0; i<2; ++i) id+=floor(random()*9)
    const pattern = RegExp("<img.+?src=[\"'](.+?)[\"'].*?>")
    const website = await fetch(`https://prnt.sc/${id}`).then(res => res.text()).then(async body => {
      const url = await pattern.exec(body)[1]
      const embed = new MessageEmbed()
        .setTitle('Random pic')
        .setImage(url)
        .setFooter(`From https://prnt.sc/ | image: ${url}`)
      message.channel.send(embed)
    })
  }
})
client.login(token)
