/**
  I know, the code is sloppy, but that's not priority. :P
  
**/

const Discord = require('discord.js');
const config = require("./config.json");
const request = require('request');
const client = new Discord.Client();

const commands = [
    // General
    [
        "Help : Returns all commands.",
        "Ping : Returns 'pong'.", 
        "Talk : Returns random phrases.",
        "Hello : Says hello back.",
    ],
    // Math
    [
        "Add <2+ values> : Adds all given values.",
        "Sub/subtract <2+ values> : Multiples all given values.",
        "Mult/multiply <2+ values> : Multiplies all given values.",
        "Div/divide <2+ values> : Divides all given values.",
        "Sq/square <1 value> : Squares a given value.",
        "Sqrt <1 value> : Returns square root of value."
    ],
    // Khan Data
    [
        // Main Commands
        [
            "UserInfo <username> : Returns your Khan Academy stats.",
            "Hotlist <top> : Displays the top KA program on the hotlist.",
            "ProgramData <program-id> : Returns a program\'s data.",

        ],

        // ProgramData specifc commands - c!program(D/d)ata <???>
        [

        ],
    ],
];

var responses = [
    "Hey.",
    "No.",
    "Why?",
    "How?",
    "I don't know.",
    "Ask Jett.",
    "Yes.",
    "Agreed.",
    "Bye.",
    "Boi.",
];

// Credit to WhatifyNW
var getKAData = function(message, api, user, callback) {
    request(api + user, function(error, response, body) {
        if (!JSON.parse(body)) {
            message.channel.sendMessage('That profile doesn\'t exist');
            return;
        }
        callback(body);
    });
};

var userApi = "http://www.khanacademy.org/api/internal/user/profile?username=";

var status = [
    'online',
    'idle',
    'dnd'
];

client.on('ready', () => {
    console.log('I am ready!');
    client.user.setGame('c!help');
    client.user.setStatus(status[Math.round(Math.random()*2)]);
});

client.on('message', message => {

    if (!message.content.startsWith(config.prefix)) return
    if (message.author.id === client.user.id) return
    if (message.author.bot) return;

    var command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length).toLowerCase();

    var args = message.content.split(" ").slice(1);


    if (command === 'ping') {
        message.channel.sendMessage("Pong!");
    } else
    if (command === "hello") {
        message.channel.sendMessage(`Hello ${message.author.username}!`);
    } else
    if (command === 'talk') {
        message.channel.sendMessage(responses[Math.round(Math.random(0, 1)*10)]);
    } else

    if (command === 'add') {
        let numArray = args.map(n=> parseInt(n));
        let total = numArray.reduce( (p, c) => +p + +c);
        message.channel.sendMessage(total);
    } else
    if (command === 'sub' || command === 'subtract') {
        let numArray = args.map(n=> parseInt(n));
        let total = numArray.reduce( (p, c) => +p - +c);
        message.channel.sendMessage(total);
    } else
    if (command === 'mult' || command === 'multiply') {
        let numArray = args.map(n=> parseInt(n));
        let total = numArray.reduce( (p, c) => +p * +c);
        message.channel.sendMessage(total);
    } else
    if (command === 'div' || command === 'divide') {
        let numArray = args.map(n=> parseInt(n));
        let total = numArray.reduce( (p, c) => +p / +c);
        message.channel.sendMessage(total);
    } else 
    if (command === 'sq' || command === 'square') {
        message.channel.sendMessage(parseInt(args[0] * args[0]));
    } else
    if (command === 'sqrt') {
        message.channel.sendMessage(parseInt(Math.sqrt(args[0])));
    } else

    if (command === 'help') {
        if (args[0] === 'userInfo') {
            let embed = new Discord.RichEmbed(); 
            embed.setColor("#ffff00");
            embed.addField("Userinfo", 'Use **`c!userInfo <@username>`** for user\'s statistics.');
            message.channel.sendEmbed(embed);
        } else
        if (args[0] === 'hotlist') {
            let embed = new Discord.RichEmbed(); 
            embed.setColor("#ffff00");
            embed.addField("Hotlist", 'Use **`c!hotlist <top>`** for top program.');
            message.channel.sendEmbed(embed);
        } if (args[0] === 'programData') {
            let embed = new Discord.RichEmbed(); 
            embed.setColor("#ffff00");
            embed.addField("ProgramData", 'Use **`c!programData <program-id>`** for a program\'s data.');
            message.channel.sendEmbed(embed);
        } else {
            let embed = new Discord.RichEmbed(); 
            embed.setColor("#ffff00");
            embed.addField("General Commands", commands[0]);
            embed.addField("Math Operations", commands[1])
            embed.addField("Khan Data", commands[2][0]);
            message.channel.sendEmbed(embed);
        }
    } else

    if (command === 'userinfo') {
        if (args.length === 1) {
            getKAData(message, userApi, args[0], function(body) {
                let points = JSON.parse(body).points;
                let d = new Date(JSON.parse(body).dateJoined)
                let date = ("0"+(d.getMonth()+1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2) + "/" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
                let kaid = JSON.parse(body).kaid;
                let videos = JSON.parse(body).countVideosCompleted;
                let name = JSON.parse(body).nickname;
                let avatar = JSON.parse(body).avatarSrc;
                let streak = JSON.parse(body).streakLastLength;

                if (kaid.substring(0, 5) === 'kaid_') {
                    getKAData(message, 'http://www.khanacademy.org/api/internal/user/' + kaid + '/profile/widgets', '', function(widgets) {
                        try {
                            let badgeWidget = JSON.parse(widgets).filter(function(widget){return widget.widgetId === "BadgeCountWidget"})[0].renderData.badgeCountData.counts;
                            var badges = 0;
                            badgeWidget.forEach(function(counts) {
                                badges += counts.count;
                            });
                        }
                        catch(badgeWidget) {
                            badges = null;
                        }
                        let embed = new Discord.RichEmbed();
                        embed.setColor('#0DB221');
                        embed.setThumbnail(avatar);
                        embed.addField(name, '@'+args[0]);
                        embed.addField('Streak:', streak + ' days');
                        embed.addField('Videos:', videos);
                        embed.addField('Badges:', badges);
                        embed.addField('Points:', points);
                        embed.addField('Joined on:', date);
                        message.channel.sendEmbed(embed);
                    });
                }
            });
        } else if (args.length !== 1) {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', 'The correct usage is **`c!userInfo <@username>**`.');
            message.channel.sendEmbed(embed);
        } else {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', 'That command is not defined for `userInfo`. Use **`c!help userInfo`** for more.');
            message.channel.sendEmbed(embed);
        }

    } else
    if (command === 'programdata') {
        if (args.length === 1 && args[0].length > 15) {
            getKAData(message, 'https://www.khanacademy.org/api/internal/show_scratchpad?scratchpad_id=' + args[0], '', function(body) {
                let t = JSON.parse(body).scratchpad.title;
                let thumb = JSON.parse(body).imagePath;
                let l = JSON.parse(body).url;
                let a = JSON.parse(body).creatorProfile.username;
                let nick = JSON.parse(body).creatorProfile.nickname;
                let v = JSON.parse(body).scratchpad.sumVotesIncremented;
                let s = JSON.parse(body).scratchpad.spinoffCount;
                let d = new Date(JSON.parse(body).scratchpad.created);
                let c = ("0"+(d.getMonth()+1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2) + "/" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
                let f = JSON.parse(body).scratchpad.flags.length || 0;
                let hidden = JSON.parse(body).scratchpad.hideFromHotlist || false;

                let embed = new Discord.RichEmbed();
                embed.setColor("#1b964a");
                embed.setImage('https://www.khanacademy.org' + thumb);
                embed.setURL(l);
                embed.addField(t, '**Author:** ' + nick + '\n**Votes:** ' + v + '\n**Spinoffs:** ' + s + '\n**Created:** ' + c + '\n**Flags:** ' + f + '\n**Hidden:** ' + hidden);
                message.channel.sendEmbed(embed);
            });
        } else if (args.length !== 1) {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', 'The correct usage is **`c!programData <program-id>**`.');
            message.channel.sendEmbed(embed);
        } else {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', 'That program ID does not exist. Use **`c!help programData`** for more.');
            message.channel.sendEmbed(embed);
        }
        
    } else 
    if (command === 'hotlist' && args.length === 1) {
        if (args[0] === 'top') {
            getKAData(message, 'https://www.khanacademy.org/api/internal/scratchpads/top?casing=camel&sort=3&limit=1&page=0&subject=all&topic_id=xffde7c31&_=1492819743301', '', function(body) {
                
                let thumb = JSON.parse(body).scratchpads[0].thumb;
                let t = JSON.parse(body).scratchpads[0].title;
                let a = JSON.parse(body).scratchpads[0].authorNickname;
                let v = JSON.parse(body).scratchpads[0].sumVotesIncremented;
                let s = JSON.parse(body).scratchpads[0].spinoffCount;
                let l = JSON.parse(body).scratchpads[0].url;

                let embed = new Discord.RichEmbed();
                embed.setColor("#1b964a");
                embed.setImage('https://www.khanacademy.org' + thumb);
                embed.setURL(l);
                embed.addField(t, '**Author:** ' + a + '\n**Votes:** ' + v + '\n**Spinoffs:** ' + s);
                message.channel.sendEmbed(embed);
            });
        } else
        if (args.length !== 1) {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', 'The correct usage is **`c!hotlist <top>**`.');
            message.channel.sendEmbed(embed);
        }
    } else {
        let embed = new Discord.RichEmbed();
        embed.setColor('#ff0000');
        embed.addField('Error', 'That command is not defined. Use **`c!help`** for more.');
        message.channel.sendEmbed(embed);
    }
});

client.login(config.token);
