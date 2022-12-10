const { EmbedBuilder, SlashCommandBuilder, VoiceChannel, PermissionFlagsBits, GuildEmoji, Interaction } = require("discord.js");
const client = require("../index");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play A Song')
    .addStringOption(option => 
      option
       .setName("query")
       .setDescription("The Url Or Name For The Song") 
       .setRequired(true) 
      ),

  /**
    * @param {Interaction} interaction
  */
  
	async execute(interaction) {
		const { options, guild, channel, member } = interaction;

    const query = options.getString("query");
    const voiceChannel = member?.voice?.channel;

    if (!voiceChannel) return interaction.reply({ content: "You Must Be In A Voice Channel To Use This Command.", ephemeral : true });

    const clientChannel = guild?.members?.me?.voice?.channel;
    
    if (clientChannel && voiceChannel?.id != guild?.members?.me?.voice?.channelId) return interaction.reply({ content: `You Must Be Listening In <#${guild.members.me.voice.channel.id}>`, ephemeral: true });

    client.distube.play(voiceChannel, query, {
      textChannel: channel,
      member: member
    })
    await interaction.reply("Searching ...");
    setTimeout(() => {
      interaction.deleteReply();
    }, 4000)
	},
};