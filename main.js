/**
  I know, the code is sloppy, but that's not priority. :P
  
**/

"use strict";

const Discord = require('discord.js');
//const = require("./khanbot.json");
const request = require('request');
const client = new Discord.Client();
const prefix = 'k.';

const commands = [
    // Random
    [
        "Help [command] : Returns all commands.",
        "Talk : Returns random phrases.",
        "Hello : Says hello back.",
        "Ping : Returns 'pong'.",
        "Invite : Returns invite link for KhanBot",
    ],
    // Math
    [
        "Add <2+ values> : Adds all given values.",
        "Sub/subtract <2+ values> : Multiples all given values.",
        "Mult/multiply <2+ values> : Multiplies all given values.",
        "Div/divide <2+ values> : Divides all given values.",
        "Pow/power <base> <power> : Squares a given value.",
        "Sqrt <1 value> : Returns square root of value.",

    ],
    // Khan Data
    [
        "UserInfo <username> : Returns a user's Khan Academy stats.",
        "Discussion <username> : Returns a user's top discussion stats.",
        "Badges <username> : Returns a user's badge counts.",
        "Browse <page> : Displays the top KA program on the hotlist.",
        "ProgramData <program-id> : Returns a program\'s data.",
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

var getKAData = function(message, api, user, callback) {
    request(api + user, function(error, response, body) {
        if (!JSON.parse(body)) {
            message.channel.sendMessage('Error with a **`getKAData`** request.');
            return;
        }
        callback(body);
    });
};

var millisToTime = function(milliseconds) {
    let x = milliseconds / 1000;
    let s = Math.floor(x % 60);
    x /= 60;
    let m = Math.floor(x % 60);
    x /= 60;
    let h = Math.floor(x % 24);
    //x /= 24;
    //let d = Math.floor(x);
    
    return h + ' Hours, ' + m + ' Minutes, ' + s + " Seconds";
};

var totalTime = 0;
var statusNum = 0;

var userApi = "http://www.khanacademy.org/api/internal/user/profile?username=";
var programApi = 'https://www.khanacademy.org/api/internal/show_scratchpad?scratchpad_id=';

var status = [
    'online',
    'idle',
    'dnd'
];

client.on('ready', () => {
    //client.user.setGame({name: prefix + 'help'});
    //client.user.setGame({type: 1, name: prefix + "help", url: ""});
    client.user.setPresence({ game: { name: `${prefix}help`, type: 0 } });
    client.user.setUsername('KhanBot');
    console.log('I am ready Jett!');
  
    setInterval(function() {
        totalTime++;
    }, 1);
    //client.user.setStatus(status[Math.round(Math.random()*2)]);
});

client.on('message', message => {

    if (!message.content.startsWith(prefix)) return;
    if (message.author.id === client.user.id) return;
    if (message.author.bot) return;

    var command = message.content.split(" ")[0];
    command = command.slice(prefix.length).toLowerCase();

    var args = message.content.split(" ").slice(1);
    args[0] = args[0].toLowerCase();

    if (command === 'ping') {
        message.channel.sendMessage("Pong!");
    } else
    if (command === "hello") {
        message.channel.sendMessage(`Hello ${message.author.username}!`);
    } else
    if (command === 'talk') {
        message.channel.sendMessage(responses[Math.round(Math.random(0, 1)*10)]);
    } else
    if (command === 'uptime') {
        message.channel.sendMessage(':clock2: **KhanBot** has been online for ' + millisToTime(totalTime) + '.');
    } else
    if (command === 'invite') {
        let embed = new Discord.RichEmbed(); 
        embed.setColor("#5e8fe0");
        embed.addField("Invite me!", 'Use this link to invite me to **your** server!\nhttps://discordapp.com/oauth2/authorize?permissions=93184&scope=bot&client_id=307851997040738304');
        message.channel.sendEmbed(embed);
    } else
    
    if (command === 'add') {
        if (args.length > 0) {
            let numArray = args.map(n=> +n);
            let total = numArray.reduce( (p, c) => +p + +c);
            message.channel.sendMessage(total);
        }
    } else
    if (command === 'sub' || command === 'subtract') {
        if (args.length > 0) {
            let numArray = args.map(n=> +n);
            let total = numArray.reduce( (p, c) => +p - +c);
            message.channel.sendMessage(total);
        }
    } else
    if (command === 'mult' || command === 'multiply') {
        if (args.length > 0) {
            let numArray = args.map(n=> +n);
            let total = numArray.reduce( (p, c) => +p * +c);
            message.channel.sendMessage(total);
        }
    } else
    if (command === 'div' || command === 'divide') {
        if (args.length > 0) {
            let numArray = args.map(n=> +n);
            let total = numArray.reduce( (p, c) => +p / +c);
            message.channel.sendMessage(total);
        }
    } else 
    if (command === 'pow' || command === 'power') {
        if (args.length > 0) {
            message.channel.sendMessage(+Math.pow(args[0], args[1]));
        }
    } else
    if (command === 'sqrt') {
        if (args.length > 0) {
            message.channel.sendMessage(+Math.sqrt(args[0]));
        }
    } else

    if (command === 'help') {
        if (args[0] === 'userinfo') {
            let embed = new Discord.RichEmbed(); 
            embed.setColor("#ffff00");
            embed.addField("Userinfo", 'Use **`k.userInfo <username>`** for user\'s statistics.');
            message.channel.sendEmbed(embed);
        } else
        if (args[0] === 'browse') {
            let embed = new Discord.RichEmbed(); 
            embed.setColor("#ffff00");
            embed.addField("Browse", 'Use **`k.browse hot`** for top hotlist program.\nUse **`k.browse recent`** for most recent program.\nUse **`k.browse votes`** for highest voted program.');
            message.channel.sendEmbed(embed);
        } else 
        if (args[0] === 'programdata') {
            let embed = new Discord.RichEmbed(); 
            embed.setColor("#ffff00");
            embed.addField("ProgramData", 'Use **`k.programData <program-id>`** for a program\'s data.');
            message.channel.sendEmbed(embed);
        } else
        if (args[0] === 'discussion') {
            let embed = new Discord.RichEmbed(); 
            embed.setColor("#ffff00");
            embed.addField("Discussion", 'Use **`k.discussion <username>`** for a user\'s discussion.');
            message.channel.sendEmbed(embed);
        } else
        if (args[0] === 'badges') {
            let embed = new Discord.RichEmbed(); 
            embed.setColor("#ffff00");
            embed.addField("Badges", 'Use **`k.badges <username>`** for a user\'s badge counts.');
            message.channel.sendEmbed(embed);
        }
        else if (args.length === 0) {
            let embed = new Discord.RichEmbed(); 
            embed.setColor("#ffff00");
            embed.addField("Random Stuff", commands[0]);
            embed.addField("Math Operations", commands[1]);
            embed.addField("Khan Data", commands[2]);
            message.channel.sendEmbed(embed);
        }
        else {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', 'That command is not defined for `help` to check. Use **`k.help`** to see commands.');
            message.channel.sendEmbed(embed);
        }
    } else

    if (command === 'userinfo') {
        if (args.length === 1) {
            getKAData(message, userApi, args[0], function(body) {
                let data = JSON.parse(body);
                let kaid = data.kaid;

                if (data.dateJoined === null) {
                    let embed = new Discord.RichEmbed();
                    embed.setColor('#ff0000');
                    embed.addField('Error', 'That username does not exist, use **`k.help userinfo`** for more.');
                    message.channel.sendEmbed(embed);
                    return;
                }

                let d = new Date(data.dateJoined);
                let date = ("0"+(d.getMonth()+1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2) + "/" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);

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
                        // embed.setThumbnail(data.avatarSrc);
                        embed.addField(data.nickname, '@'+args[0], true);
                        embed.addField('Streak:', data.streakLastLength + ' days', true);
                        embed.addField('Videos:', data.countVideosCompleted, true);
                        embed.addField('Badges:', badges, true);
                        embed.addField('Points:', data.points, true);
                        embed.addField('Joined on:', date, true);
                        message.channel.sendEmbed(embed);
                    });
                } else
                if (kaid.substring(0, 5) !== 'kaid_') {
                    let embed = new Discord.RichEmbed();
                    embed.setColor('#ff0000');
                    embed.addField('Error', 'That username returned no KAID, use **`k.help userinfo`** for more.');
                    message.channel.sendEmbed(embed);
                }
            });
        } else if (args.length !== 1) {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', 'The correct usage is **`k.userInfo <username>`**.');
            message.channel.sendEmbed(embed);
        } else {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', 'That command is not defined for `userInfo`. Use **`k.help userInfo`** for more.');
            message.channel.sendEmbed(embed);
        }

    } else
    if (command === 'programdata') {
        if (args.length === 1) {
            getKAData(message, programApi, args[0], function(body) {
                let sdata = JSON.parse(body).scratchpad;
                let data = JSON.parse(body);
                
                let d = new Date(sdata.created);
                let c = ("0"+(d.getMonth()+1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2) + "/" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
                
                let embed = new Discord.RichEmbed();
                embed.setColor("#1b964a");
                embed.setImage(sdata.imageUrl);
                embed.setURL(sdata.url);
                embed.setTitle(sdata.title);
                embed.addField('Author', data.creatorProfile.nickname, true);
                embed.addField('Votes', sdata.sumVotesIncremented, true);
                embed.addField('Spinoffs', sdata.spinoffCount, true);
                embed.addField('Created', c, true);
                embed.addField('Flags', sdata.flags.length, true);
                embed.addField('Hidden', sdata.hideFromHotlist, true);
                message.channel.sendEmbed(embed);
            });
        } else 
        if (args.length !== 1) {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', 'The correct usage is **`k.programData <program-id>`**.');
            message.channel.sendEmbed(embed);
        } else {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', 'That program ID does not exist. Use **`k.help programData`** for more.');
            message.channel.sendEmbed(embed);
        }
    } else 
    if (command === 'browse') {
        var page = null;
        if (args[0] === 'hot') {
            page = 3;
        } else
        if (args[0] === 'recent') {
            page = 2;
        } else
        if (args[0] === 'votes') {
            page = 5;
        }
        if (page !== null) {
            getKAData(message, 'https://www.khanacademy.org/api/internal/scratchpads/top?casing=camel&sort='+page+'&limit=1&page=0&subject=all&topic_id=xffde7c31&_=1492819743301', '', function(body) {
                let data = JSON.parse(body).scratchpads[0];

                let embed = new Discord.RichEmbed();
                embed.setColor("#1b964a");
                embed.setImage('https://www.khanacademy.org' + data.thumb);
                embed.setURL(data.url);
                embed.setTitle(data.title);
                embed.addField('Author', data.authorNickname, true);
                embed.addField('Votes', data.sumVotesIncremented, true);
                embed.addField('Spinoffs', data.spinoffCount, true);
                message.channel.sendEmbed(embed);
            });
        } else
        if (page === null) {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', 'Incorrect usage, use **`k.help browse`** for more.');
            message.channel.sendEmbed(embed);
        } else
        if (args.length !== 1) {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', 'Incorrect usage, use **`k.help browse`** for more.');
            message.channel.sendEmbed(embed);
        }
    } else
    if (command === 'discussion') {
        if (args.length === 1) {
            getKAData(message, userApi, args[0], function(body) {
                let kaid = JSON.parse(body).kaid;
                let nick = JSON.parse(body).nickname;

                // Add error like the userinfo error, if not public

                getKAData(message, 'https://www.khanacademy.org/api/internal/user/'+kaid+'/profile/widgets', '', function(widgets) {
                    try {
                        let discussWidget = JSON.parse(widgets).filter(function(widget){return widget.widgetId === "DiscussionWidget"})[0].renderData.discussionData;
                        var stats = discussWidget.statistics;

                        let embed = new Discord.RichEmbed();
                        embed.setColor("#1b964a");
                        //embed.setImage('https://www.khanacademy.org' + data.imagePath);
                        //embed.setURL(data.url);
                        embed.addField(nick, '@'+args[0], true);
                        embed.addField('Questions', stats.questions , true);
                        embed.addField('Answers', stats.answers, true);
                        embed.addField('Evaluations', stats.projectanswers , true);
                        embed.addField('Tips&Thx', stats.comments , true);
                        embed.addField('Comments', stats.replies , true);
                        embed.addField('Votes', stats.votes , true);
                        embed.addField('Flags', stats.flags , true);
                        message.channel.sendEmbed(embed);
                    }
                    catch(discussWidget) {
                        stats = null;
                    }
                });
            });
        } else 
        if (args.length !== 1) {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', 'The correct usage is **`k.discussion <username>`**.');
            message.channel.sendEmbed(embed);
        }
    } else
    if (command === 'badges') {
        if (args.length === 1) {
            getKAData(message, userApi, args[0], function(body) {
                let kaid = JSON.parse(body).kaid;

                if (kaid.substring(0, 5) === 'kaid_') {
                    var badges = [];
                    var types = [];

                    getKAData(message, 'http://www.khanacademy.org/api/internal/user/' + kaid + '/profile/widgets', '', function(widgets) {
                        try {
                            let badgeWidget = JSON.parse(widgets).filter(function(widget){return widget.widgetId === "BadgeCountWidget"})[0].renderData.badgeCountData.counts;
                            badgeWidget.forEach(function(counts) {
                                badges.push(counts.count);
                                types.push(counts.typeLabel);
                            });
                            let embed = new Discord.RichEmbed();
                            embed.setColor('#0DB221');
                            //embed.setThumbnail(data.avatarSrc);
                            for (var i = 0; i < badges.length; i++) {
                                embed.addField(types[i], badges[i], true);
                            }
                            message.channel.sendEmbed(embed);
                        }
                        catch(badgeWidget) {
                            let embed = new Discord.RichEmbed();
                            embed.setColor('#ff0000');
                            embed.addField('Error', 'That user has no public badges.');
                            message.channel.sendEmbed(embed);
                        }

                    });
                } else
                if (kaid.substring(0, 5) !== 'kaid_') {
                    let embed = new Discord.RichEmbed();
                    embed.setColor('#ff0000');
                    embed.addField('Error', 'That username returned no KAID, use **`k.help badges`** for more.');
                    message.channel.sendEmbed(embed);
                }
            });
        } else
        if (args.length !== 1) {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', 'The correct usage is **`k.badges <username>`**.');
            message.channel.sendEmbed(embed);
        }
    }
    /*
    else {
        let embed = new Discord.RichEmbed();
        embed.setColor('#ff0000');
        embed.addField('Error', 'That command is not defined. Use **`k.help`** for more.');
        message.channel.sendEmbed(embed);
    }*/
});

client.login(process.env.BOT_TOKEN);
