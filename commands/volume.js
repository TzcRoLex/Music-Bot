const { EmbedBuilder, SlashCommandBuilder, VoiceChannel, PermissionFlagsBits, GuildEmoji, Interaction } = require("discord.js");
const client = require("../index");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Set Volume From 1 To 100%')
    .addIntegerOption(option => 
      option
       .setName("percent")
       .setDescription("From 1 To 100")
       .setMinValue(1)
       .setMaxValue(100)
       .setRequired(true)
      ),

  /**
    * @param {Interaction} interaction
  */
  
	async execute(interaction) {
		const { options, guild, channel, member } = interaction;

    const volume = options.getInteger("percent");
    const voiceChannel = member.voice.channel;

    if (!voiceChannel) return interaction.reply({ content: "You Must Be In A Voice Channel To Use This Command.", ephemeral : true });

    if (voiceChannel.id != guild.members.me.voice.channel.id) return interaction.reply({ content: `You Must Be Listening In <#${guild.members.me.voice.channel.id}>`, ephemeral: true });

    client.distube.setVolume(voiceChannel, volume)
    await interaction.reply({ content: `Volume Has Been Set To ${volume}%` })
	},
};