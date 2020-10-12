const { Client, MessageEmbed } = require('discord.js')
const fetch              = require('node-fetch')      
const { token, prefix }  = require('../config')
const { floor, random }  = Math

const characters = 'abcdefghijklmnopqrstuvwxyz'.split('')
const client = new Client()

client.once('ready', () => console.log(`${client.user.tag} is ready!`))
client.on('message', async message => {
  if (!message.content.startsWith(prefix) || !message.guild || message.author.bot) return
  if (message.content.toLowerCase().startsWith(`${prefix}randompic`)) {
    let id = '';
    for (let i=0; i<4; ++i) id += characters[floor(random()*characters.length)]
    for (let i=0; i<2; ++i) id += floor(random()*9)
    const pattern = RegExp("<img.+?src=[\"'](.+?)[\"'].*?>")
    const website = await fetch(`https://prnt.sc/${id}`).then(res => res.text()).then(async body => {
      let url = await pattern.exec(body)[1]
      if (url.startsWith('//')) url = `https:${url}`
      const embed = new MessageEmbed()
        .setTitle('Random pic')
        .setImage(url)
        .setFooter(`From https://prnt.sc/ | image: ${url}`)
      message.channel.send(embed)
    })
  }
})
client.login(token)
