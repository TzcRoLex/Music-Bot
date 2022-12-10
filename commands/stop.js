const { EmbedBuilder, SlashCommandBuilder, VoiceChannel, PermissionFlagsBits, GuildEmoji, Interaction } = require("discord.js");
const client = require("../index");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop The Music.'),

  /**
    * @param {Interaction} interaction
  */
  
	async execute(interaction) {
		const { options, guild, channel, member } = interaction;

    const query = options.getString("query");
    const voiceChannel = member.voice.channel;

    if (!voiceChannel) return interaction.reply({ content: "You Must Be In A Voice Channel To Use This Command.", ephemeral : true });

    if (voiceChannel.id != guild.members.me.voice.channel.id) return interaction.reply({ content: `You Must Be Listening In <#${guild.members.me.voice.channel.id}>`, ephemeral: true })

    const queue = await client.distube.getQueue(voiceChannel);

    if (!queue) return interaction.reply({ content: "There Is No Active Queue.", ephemeral: true });

    await queue.stop(voiceChannel);
    await interaction.reply("The Queue Has Been Stopped");
	},
};