const axios = require('axios')
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv')

dotenv.config()

// Token fetched using @BotFather to crate a new bot
const TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(TOKEN,{polling: true});
// polling : true ==> allow the bot to keep checking for new messages again and again

bot.on('message',(msg)=>{
    const text = msg.text;

    console.log("Message received: ",text);

    bot.sendMessage(msg.chat.id, "You said: " + text)
})

bot.onText(/\/start/,(msg)=>{
    bot.sendMessage(msg.chat.id, "Hello! I am a bot. How can i help you?")
});

const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "What do you call fake spaghetti? An impasta!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "I told my computer I needed a break, and now it won’t stop sending me KitKat ads.",
    "Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears!"
];

function getRandomJoke() {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    return jokes[randomIndex];
}

bot.onText(/\/joke/,async(msg)=>{
    const joke = await axios.get('https://official-joke-api.appspot.com/random_joke');

    const setup = joke.data.setup;
    const punchline = joke.data.punchline;

    bot.sendMessage(msg.chat.id, setup + " " + punchline);
});