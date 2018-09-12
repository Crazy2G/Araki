const Command = require('../../structures/Command')

module.exports = class PingCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'ping',
      aliases: ['pong', 'ping-pong'],
      group: 'utils',
      memberName: 'ping',
      description: 'Um comando para ver se eu estou funcionando corretamente!',
      guarded: true
    })
  }

  async run (msg) {
    const message = await msg.say('...')
    const ping = Math.round(message.createdTimestamp - msg.createdTimestamp)
    return message.edit([
      `${msg.author} Pong!`,
      `:ping_pong: | **${ping}**ms`,
      `:heartbeat: | **${Math.round(this.client.ping)}**ms`
    ].join('\n'))
  }
}
