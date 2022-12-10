const { EmbedBuilder, SlashCommandBuilder, VoiceChannel, PermissionFlagsBits, GuildEmoji, Interaction } = require("discord.js");
const client = require("../index");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('repeat')
		.setDescription('Repeat Queue/Music/Off.')
    .addStringOption(option =>
      option.setName("mode")
        .setDescription("Repeat Mode")
        .addChoices(
          { name: "off", value: "off" },
          { name: "song", value: "song" },
          { name: "queue", value: "queue" }
        )
        .setRequired(true)
      ),

  /**
    * @param {Interaction} interaction
  */
  
	async execute(interaction) {
		const { options, guild, channel, member } = interaction;

    let mode = options.getString("mode");
    const voiceChannel = member.voice.channel;

    if (!voiceChannel) return interaction.reply({ content: "You Must Be In A Voice Channel To Use This Command.", ephemeral : true });

    if (voiceChannel.id != guild.members.me.voice.channel.id) return interaction.reply({ content: `You Must Be Listening In <#${guild.members.me.voice.channel.id}>`, ephemeral: true })

    const queue = await client.distube.getQueue(voiceChannel);

    if (!queue) return interaction.reply({ content: "There Is No Active Queue.", ephemeral: true });

    switch (mode) {
      case 'off':
        mode = 0
        break;
      case 'song':
        mode = 1
        break;
      case 'queue':
        mode = 2
        break;
    }
    mode = queue.setRepeatMode(mode)
    mode = mode ? (mode === 2 ? 'Repeat queue' : 'Repeat song') : 'Off';
    await interaction.reply(`${client.emotes.repeat} | Set repeat mode to \`${mode}\``)
	},
};