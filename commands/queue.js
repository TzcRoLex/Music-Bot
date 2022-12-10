const { EmbedBuilder, SlashCommandBuilder, VoiceChannel, PermissionFlagsBits, GuildEmoji, Interaction } = require("discord.js");
const client = require("../index");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Show The Playlist'),

  /**
    * @param {Interaction} interaction
  */
  
	async execute(interaction) {
		const { options, guild, channel, member } = interaction;

    const voiceChannel = member?.voice?.channel;

    if (!voiceChannel) return interaction.reply({ content: "You Must Be In A Voice Channel To Use This Command.", ephemeral : true });

    const clientChannel = guild?.members?.me?.voice?.channel;
    
    if (clientChannel && voiceChannel?.id != guild?.members?.me?.voice?.channelId) return interaction.reply({ content: `You Must Be Listening In <#${guild.members.me.voice.channel.id}>`, ephemeral: true });

    const queue = await client.distube.getQueue(voiceChannel);

    if (!queue) return interaction.reply({ content: "There Is No Active Queue.", ephemeral: true });

    let embed = new EmbedBuilder()
      .setColor("Random")
      .setDescription(`${queue.songs.map((song, id) => `\n**${id + 1}.** ${song.name} - \`${song.formattedDuration}\` `)}`)

    await interaction.reply({ embeds: [embed] })
	},
};