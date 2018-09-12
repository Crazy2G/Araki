const Command = require('../../structures/Command.js')
const moment = require('moment')
const { RichEmbed } = require('discord.js')
moment.locale('pt-br')

module.exports = class EmojiInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'emoji-info',
      aliases: ['emoji'],
      group: 'utils',
      memberName: 'emoji',
      description: 'Responde com informação detalhada sobre um emoji!',
      guildOnly: true,
      clientPermissions: ['EMBED_LINKS'],
      args: [
        {
          key: 'emoji',
          prompt: 'Qual emoji você quer obter informação?',
          type: 'emoji'
        }
      ]
    });
  }

  run (msg, { emoji }) {
    const embed = new RichEmbed()
      .setColor(0x00AE86)
      .setThumbnail(emoji.url)
      .addField('❯ Nome', emoji.name, true)
      .addField('❯ ID', emoji.id, true)
      .addField('❯ Data de Criação', moment(emoji.createdTimestamp).format('LLL'), true)
      .addField('❯ Animado?', emoji.animated ? 'Sim' : 'Não', true);
    return msg.embed(embed);
  }
};