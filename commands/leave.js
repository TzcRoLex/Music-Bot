const { EmbedBuilder, SlashCommandBuilder, VoiceChannel, PermissionFlagsBits, GuildEmoji, Interaction } = require("discord.js");
const client = require("../index");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Leave The Voice Channel'),

  /**
    * @param {Interaction} interaction
  */
  
	async execute(interaction) {
		const { options, guild, channel, member } = interaction;

    const voiceChannel = member?.voice?.channel;

    if (!voiceChannel) return interaction.reply({ content: "You Must Be In A Voice Channel To Use This Command.", ephemeral : true });

    const clientChannel = guild?.members?.me?.voice?.channel;
    
    if (clientChannel && voiceChannel?.id != guild?.members?.me?.voice?.channelId) return interaction.reply({ content: `You Must Be Listening In <#${guild.members.me.voice.channel.id}>`, ephemeral: true });

    client.distube.voices.leave(guild)

    await interaction.reply({ content: `Done Leaved ${voiceChannel.name}` })
	},
};