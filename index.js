const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.once("ready", async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  const guild = await client.guilds.fetch(process.env.GUILD_ID);

  await guild.channels.fetch();

  const channel = guild.channels.cache.get(process.env.VOICE_CHANNEL_ID);

  if (!channel) {
    console.log("❌ Voice channel not found.");
    return;
  }

  joinVoiceChannel({
    channelId: channel.id,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator,
    selfDeaf: true,
    selfMute: false,
  });

  console.log(`🎧 Joined ${channel.name}`);
});

client.login(process.env.TOKEN);