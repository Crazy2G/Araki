const { CommandoClient } = require('discord.js-commando')

const path = require('path')
const logger = require('./utils/logger.js')
const config = require('./config.json')
const activities = require('./assets/json/activities.json')

const client = new CommandoClient({
  commandPrefix: config.prefix,
  owner: config.owners,
  disableEveryone: true,
  fetchAllMembers: true,
  unknownCommandResponse: false
})

client.registry
  .registerDefaultTypes()
  .registerTypesIn(path.join(__dirname, 'types'))
  .registerDefaultGroups()
  .registerGroups([
    ['admin', 'Comandos de Administração'],
    ['music', 'Comandos de Música'],
    ['utils', 'Comandos Úteis'],
    ['fun', 'Comandos de Diversão'],
    ['jogos', 'Comandos de Jogos']
  ])
  .registerDefaultCommands({
    help: false,
    ping: false,
    eval: false,
    prefix: false,
    commandState: false
  })
  .registerCommandsIn(path.join(__dirname, 'commands'))

client.on('error', logger.error)
  .on('warn', logger.warn)
  .on('debug', logger.debug)
  .on('disconnect', logger.warn)
  .on('reconnect', logger.warn)
  .on('commandError', logger.error)
  .on('commandRun', logger.info)
  .on('ready', () => {
    logger.info(`Conectado como ${client.user.tag}, agindo em ${client.guilds.size} servidores para ${client.users.size} usuários!`)
    client.setInterval(() => {
      const activity = activities[Math.floor(Math.random() * activities.length)]
      client.user.setActivity(activity.text, { type: activity.type })
    }, 60000)
  })

client.login(process.env.DISCORD_TOKEN)
