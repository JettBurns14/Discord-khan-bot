const Discord = require('discord.js');
const request = require('request');
const client = new Discord.Client();
const prefix = 'k.';

// Start Glitch stuff ==========>
/*
const http = require('http');
const express = require('express');
const app = express();

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

app.listen(process.env.PORT);
// console.log(process.env.PROJECT_DOMAIN);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
*/
// End Glitch stuff <==========


const commands = [
    // Random
    [
        "Help [command] : Returns all commands.",
        "Talk : Returns random phrases.",
        "Hello : Says hello back.",
        "Ping : Returns 'pong'.",
        "Info : Returns info about KhanBot.",
        "Uptime : Returns time since I last launched.",
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
        "UserPrograms <username> : Returns a user's projects stats.",
        "BadgeInfo <badge-name> : Returns info about a given badge."
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
    "Nah.",
    "Wut.",
    "Wat.",
    "Impossible! :O",
    "No way!",
    "Of course!",
    "Why you asking me?",
    "Don't ask me!",
    "I had nothing to do with it!",
    "Leave me alone. :P",
    "<:Thonk:358268256110510091>",
];

var greetings = [
    "Hai",
    "Hi",
    "Sup",
    "Hello",
    "Yo, wus up",
    "Greetings",
    "Hola",
    "Good day",
    "Howdy",
    "Hey",
    "Hiya",
    "Hi there",
    "Heyyaz",

];

var getKAData = function(message, api, user, callback) {
    request(api + user, function(error, response, body) {
        if (!JSON.parse(body) || error) {
            message.channel.sendMessage(`Error with a **\`getKAData\`** request: ${error}`);
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
var mode;

var userApi = "https://www.khanacademy.org/api/internal/user/profile?username=";
var programApi = 'https://www.khanacademy.org/api/internal/show_scratchpad?scratchpad_id=';
var labsApi = 'https://www.khanacademy.org/api/labs/scratchpads/';

var status = [
    'online',
    'idle',
    'dnd'
];

client.on('ready', () => {
    var games = [
        `${client.guilds.size} Servers`,
        `${client.users.size} Users`,
        `${client.channels.size} Channels`
    ];
    client.user.setPresence({ game: { name: `${prefix}help | ${games[Math.floor(Math.random()*games.length)]}`, type: 0 } });
    client.user.setUsername('KhanBot');
    console.log('I am ready Jett!');
    console.log(`I have started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);

    setInterval(function() {
        totalTime++;
    }, 1);

  /*
    let embed = new Discord.RichEmbed();
    embed.setColor('#0DB221');
    embed.setThumbnail('https://media.discordapp.net/attachments/372916099114729472/388913604377968662/image.png');
    embed.addField('Ready', 'I am online and at your service, Jett!');
    embed.setTimestamp();
    client.users.find('id', '218397146049806337').send({ embed });
  */

    //client.user.setGame({name: prefix + 'help'});
    //client.user.setGame({type: 1, name: prefix + "help", url: ""});
    //client.user.setStatus(status[Math.round(Math.random()*2)]);
});

client.on('message', message => {

    if (!message.content.startsWith(prefix)) return;
    if (message.author.id === client.user.id) return;
    if (message.author.bot) return;

    var command = message.content.split(" ")[0];
    command = command.slice(prefix.length).toLowerCase();

    var args = message.content.split(" ").slice(1);
    //args[0] = args[0].toLowerCase();
    //var args = message.content.split(" ").slice(1);//.toString().toLowerCase();
    //var args = argsU.toLowerCase();
    //args = args.toLowerCase();

    if (command === 'ping') {
        message.channel.send("Pong!");
    } else
    if (command === 'hello' || command === 'hi') {
        message.channel.send(`${greetings[Math.floor(Math.random()*(greetings.length))]} ${message.author.username}!`);
    } else
    if (command === 'talk') {
        message.channel.send(responses[Math.round(Math.random(0, 1)*10)]);
    } else
    if (command === 'uptime') {
        message.channel.send(':clock2: **KhanBot** has been online for ' + millisToTime(totalTime) + '.');
    } else
    if (command === 'info') {
        let embed = new Discord.RichEmbed();
        embed.setThumbnail(client.user.avatarURL);
        embed.addField('Users', client.users.size, true);
        embed.addField('Servers', client.guilds.size, true);
        embed.addField('Creator', '<@218397146049806337>', true);
        embed.addField("Invite", 'http://bit.ly/inviteKhanbot', true);
        embed.setColor('#00ffcc');
        message.channel.send({ embed });
    } else

    if (command === 'add') {
        if (args.length > 0) {
            let numArray = args.map(n=> +n);
            let total = numArray.reduce( (p, c) => +p + +c);
            message.channel.send(total);
        }
    } else
    if (command === 'sub' || command === 'subtract') {
        if (args.length > 0) {
            let numArray = args.map(n=> +n);
            let total = numArray.reduce( (p, c) => +p - +c);
            message.channel.send(total);
        }
    } else
    if (command === 'mult' || command === 'multiply') {
        if (args.length > 0) {
            let numArray = args.map(n=> +n);
            let total = numArray.reduce( (p, c) => +p * +c);
            message.channel.send(total);
        }
    } else
    if (command === 'div' || command === 'divide') {
        if (args.length > 0) {
            let numArray = args.map(n=> +n);
            let total = numArray.reduce( (p, c) => +p / +c);
            message.channel.send(total);
        }
    } else
    if (command === 'pow' || command === 'power') {
        if (args.length > 0) {
            message.channel.send(+Math.pow(args[0], args[1]));
        }
    } else
    if (command === 'sqrt') {
        if (args.length > 0) {
            message.channel.send(+Math.sqrt(args[0]));
        }
    } else

    if (command === 'help') {
        if (args[0] === 'userinfo' || args[0] === 'userInfo') {
            let embed = new Discord.RichEmbed();
            embed.setColor("#ffff00");
            embed.addField("Userinfo", 'Use **`k.userInfo <username>`** for user\'s statistics.');
            message.channel.send({ embed });
        } else
        if (args[0] === 'browse') {
            let embed = new Discord.RichEmbed();
            embed.setColor("#ffff00");
            embed.addField("Browse", 'Use **`k.browse hot`** for top hotlist program.\nUse **`k.browse recent`** for most recent program.\nUse **`k.browse votes`** for highest voted program.');
            message.channel.send({ embed });
        } else
        if (args[0] === 'programdata' || args[0] === 'programData') {
            let embed = new Discord.RichEmbed();
            embed.setColor("#ffff00");
            embed.addField("ProgramData", 'Use **`k.programData <program-id>`** for a program\'s data.');
            message.channel.send({ embed });
        } else
        if (args[0] === 'discussion') {
            let embed = new Discord.RichEmbed();
            embed.setColor("#ffff00");
            embed.addField("Discussion", 'Use **`k.discussion <username>`** for a user\'s discussion.');
            message.channel.send({ embed });
        } else
        if (args[0] === 'badges') {
            let embed = new Discord.RichEmbed();
            embed.setColor("#ffff00");
            embed.addField("Badges", 'Use **`k.badges <username>`** for a user\'s badge counts.');
            message.channel.send({ embed });
        } else
        if (args[0] === 'userprograms' || args[0] === 'userPrograms') {
            let embed = new Discord.RichEmbed();
            embed.setColor("#ffff00");
            embed.addField("UserPrograms", 'Use **`k.userPrograms <username>`** to get all a user\'s program stats.');
            message.channel.send({ embed });
        } else
        if (args[0] === 'badgeinfo' || args[0] === 'badgeInfo') {
            let embed = new Discord.RichEmbed();
            embed.setColor("#ffff00");
            embed.addField("BadgeInfo", 'Use **`k.badgeInfo <badge-name>`** to returns info about a given badge.');
            message.channel.send({ embed });
        }
        else if (args.length === 0) {
            let embed = new Discord.RichEmbed();
            embed.setColor("#ffff00");
            embed.addField("Random Stuff", commands[0]);
            embed.addField("Math Operations", commands[1]);
            embed.addField("Khan Data", commands[2]);
            message.channel.send({ embed });
        }
        else {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', 'That command is not defined for `help` to check. Use **`k.help`** to see commands.');
            message.channel.send({ embed });
        }
    } else

    if (command === 'userinfo') {
        if (args.length === 1) {
            getKAData(message, userApi, args[0], function(body) {
                if (!JSON.parse(body)) {
                    let embed = new Discord.RichEmbed();
                    embed.setColor('#ff0000');
                    embed.addField('Error', 'That username does not exist, use **`k.help userinfo`** for more.');
                    message.channel.send({ embed });
                    return;
                }
                let data = JSON.parse(body);
                let kaid = data.kaid;

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
                        embed.setThumbnail(data.avatar.imagePath.replace(/\/images\/avatars\/(?:svg\/)?(.*?)\.(?:svg|png)/ig, (match, g) => `https://www.kasandbox.org/programming-images/avatars/${g}.png`));
                        embed.setURL('https://www.khanacademy.org' + data.profileRoot);
                        embed.addField(data.nickname, '@' + args[0], true);
                        embed.addField('Streak:', data.streakLastLength.toLocaleString() + ' days', true);
                        embed.addField('Videos:', (data.dateJoined == null ? 'Not Public' : data.countVideosCompleted.toLocaleString()), true);
                        embed.addField('Badges:', (badges == null ? 'Not Public' : badges.toLocaleString()), true);
                        embed.addField('Points:', (data.dateJoined == null ? 'Not Public' : data.points.toLocaleString()), true);
                        embed.addField('Joined on:', (data.dateJoined == null ? 'Not Public' : date), true);
                        message.channel.send({ embed });
                    });
                } else
                if (kaid.substring(0, 5) !== 'kaid_') {
                    let embed = new Discord.RichEmbed();
                    embed.setColor('#ff0000');
                    embed.addField('Error', 'That username returned no KAID, use **`k.help userinfo`** for more.');
                    message.channel.send({ embed });
                }
            });
        } else
        if (args.length !== 1) {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', 'The correct usage is **`k.userInfo <username>`**.');
            message.channel.send({ embed });
        } else {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', 'That command is not defined for `userInfo`. Use **`k.help userInfo`** for more.');
            message.channel.send({ embed });
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
                embed.addField('Votes', sdata.sumVotesIncremented.toLocaleString(), true);
                embed.addField('Spinoffs', sdata.spinoffCount.toLocaleString(), true);
                embed.addField('Created', c, true);
                embed.addField('Flags', sdata.flags.length.toLocaleString(), true);
                embed.addField('Hidden', sdata.hideFromHotlist, true);
                message.channel.send({ embed });
            });
        } else
        if (args.length !== 1) {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', 'The correct usage is **`k.programData <program-id>`**.');
            message.channel.send({ embed });
        } else {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', 'That program ID does not exist. Use **`k.help programData`** for more.');
            message.channel.send({ embed });
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
            /*
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
            });*/
            // Load the top program of any of the pages.
            getKAData(message, 'https://www.khanacademy.org/api/internal/scratchpads/top?casing=camel&sort='+page+'&limit=1&page=0&subject=all&topic_id=xffde7c31&_=1492819743301', '', function(body) {
                let data = JSON.parse(body).scratchpads[0];
                let embed = new Discord.RichEmbed();

                getKAData(message, labsApi, data.url.split('/')[5], function(body2) {
                    embed.setColor("#1b964a");
                    embed.setImage('https://www.khanacademy.org' + data.thumb);
                    embed.setURL(data.url);
                    embed.setTitle(data.title);
                    embed.addField('Author', data.authorNickname, true);
                    embed.addField('Votes', data.sumVotesIncremented.toLocaleString(), true);
                    embed.addField('Spinoffs', data.spinoffCount.toLocaleString(), true);
                    embed.addField('Flags', JSON.parse(body2).flags.length.toLocaleString(), true);
                    message.channel.send({ embed });
                });

                //embed.addField('Flags', data.flags.length, true);
            });
        } else
        if (page === null) {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', 'Incorrect usage, use **`k.help browse`** for more.');
            message.channel.send({ embed });
        } else
        if (args.length !== 1) {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', 'Incorrect usage, use **`k.help browse`** for more.');
            message.channel.send({ embed });
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
                        embed.addField('Questions', stats.questions.toLocaleString() , true);
                        embed.addField('Answers', stats.answers.toLocaleString(), true);
                        embed.addField('Evaluations', stats.projectanswers.toLocaleString() , true);
                        embed.addField('Tips&Thx', stats.comments.toLocaleString() , true);
                        embed.addField('Comments', stats.replies.toLocaleString() , true);
                        embed.addField('Votes', stats.votes.toLocaleString() , true);
                        embed.addField('Flags', stats.flags.toLocaleString() , true);
                        message.channel.send({ embed });
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
            message.channel.send({ embed });
        }
    } else

    if (command === 'badges') {
        if (args.length === 1) {
            getKAData(message, userApi, args[0], function(body) {
                let kaid = JSON.parse(body).kaid;

                if (kaid.substring(0, 5) === 'kaid_') {
                    var badges = [];
                    var types = [];
                    var badgeNum = 0;

                    getKAData(message, 'http://www.khanacademy.org/api/internal/user/' + kaid + '/profile/widgets', '', function(widgets) {
                        try {
                            let badgeWidget = JSON.parse(widgets).filter(function(widget) {
                                return widget.widgetId === "BadgeCountWidget";
                            })[0].renderData.badgeCountData.counts;
                            badgeWidget.forEach(function(counts) {
                                badges.push(counts.count.toLocaleString());
                                types.push(counts.typeLabel);
                                badgeNum += counts.count;
                            });
                            let embed = new Discord.RichEmbed();
                            embed.setColor('#0DB221');
                            embed.setThumbnail(JSON.parse(body).publicBadges[0].iconSrc);
                            for (var i = 0; i < badges.length; i++) {
                                embed.addField(types[i], badges[i], true);
                            }
                            embed.addField('Total', badgeNum, true);
                            message.channel.send({ embed });
                        }
                        catch(badgeWidget) {
                            let embed = new Discord.RichEmbed();
                            embed.setColor('#ff0000');
                            embed.addField('Error', 'That user has no public badges.');
                            message.channel.send({ embed });
                        }

                    });
                } else
                if (kaid.substring(0, 5) !== 'kaid_') {
                    let embed = new Discord.RichEmbed();
                    embed.setColor('#ff0000');
                    embed.addField('Error', 'That username returned no KAID, use **`k.help badges`** for more.');
                    message.channel.send({ embed });
                }
            });
        } else
        if (args.length !== 1) {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', 'The correct usage is **`k.badges <username>`**.');
            message.channel.send({ embed });
        }
    } else

    if (command === 'badgeinfo') {
        console.log('badgeInfo called');
        if (args.length === 1) {
            console.log('args === 1');
            console.log(args[0]);
            getKAData(message, 'https://www.khanacademy.org/api/internal/user/badges', '', function(body) {
                console.log(body);
                /*
                var badgeObj = body.badgeCollections[0].badges.filter(function(x) {
                    return x.slug === args[0];
                });
                console.log(badgeObj);*/
                //message.channel.send(badgeObj.safeExtendedDescription);
            });
        } else
        if (args.length !== 1) {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', ':x: The correct usage is **`k.badgeInfo <badge name>`**.');
            message.channel.send({ embed });
        }
    } else

    if (command === 'userprograms') {
        if (args.length === 1) {
            getKAData(message, 'https://www.khanacademy.org/api/internal/user/scratchpads?username=' + args[0] + '&limit=1000', '', function(body) {
                let numPrograms = JSON.parse(body).scratchpads.length;
                let sbody = JSON.parse(body).scratchpads;

                if (numPrograms > 0) {
                    let numVotes = 0;
                    let numSpinoffs = 0;

                    for (var i = 0; i < numPrograms; ++i) {
                        var scratchpad = JSON.parse(body).scratchpads[i];
                        numVotes += scratchpad.sumVotesIncremented;
                        numSpinoffs += scratchpad.spinoffCount;
                    }
                    let nick = JSON.parse(body).scratchpads[0].authorNickname;
                    let embed = new Discord.RichEmbed();

                    embed.setColor("#1b964a");
                    embed.setThumbnail('https://www.khanacademy.org' + sbody[0].thumb);
                    embed.setURL(sbody[0].url);
                    embed.addField(nick, `@${args[0]}`, true);
                    embed.addField('Programs:', numPrograms.toLocaleString() , true);
                    embed.addField('Total Votes:', numVotes.toLocaleString() , true);
                    embed.addField('Total Spinoffs:', numSpinoffs.toLocaleString() , true);
                    embed.addField('Average Votes Received:', Math.round((numVotes / numPrograms) * 100) / 100, true);
                    embed.addField('Average Spin-offs Received:', Math.round((numSpinoffs / numPrograms) * 100) / 100, true);
                    // Average votes received = Math.round((numVotes / numPrograms) * 100) / 100
                    // Average spinoffs received = Math.round((numSpinoffs / numPrograms) * 100) / 100
                    message.channel.send({ embed });
                } else {
                    let embed = new Discord.RichEmbed();
                    embed.setColor('#ff0000');
                    embed.addField('Error', ':x: That user has no programs, use **`k.help userPrograms`** for more.');
                    message.channel.send({ embed });
                }
            });
        } else
        if (args.length !== 1) {
            let embed = new Discord.RichEmbed();
            embed.setColor('#ff0000');
            embed.addField('Error', ':x: The correct usage is **`k.userPrograms <username>`**.');
            message.channel.send({ embed });
        }
    } else

    if (command === 'update') {
        // Automatically run this command incase the bot crashes, it continues to run regardless if I start it.
        // Check author name, only I can call these commands.
        // Bot only posts in certain channel with ID.
        // Maybe let admin use command.
        // Add timestamp.
        // Instead of posting a new message every interval, it just edits the message so there is always one.

        // Check perms and channel.
        if (message.author.id != 218397146049806337) {
            message.channel.send('You don\'t have permission to use this command, sorry!');
            return;
        }
        if (message.channel.id != 371013264525492225) {
            message.channel.send('I can\'t execute this command outside of the Dusktopia #recent-list channel, sorry!');
            return;
        }
        // Check arg.
        if (args[0] === 'stop') {
            mode = 'stop';
        } else
        if (args[0] === 'start') {
            mode = 'start';
        }

        function getProgram() {
            getKAData(message, 'https://www.khanacademy.org/api/internal/scratchpads/top?casing=camel&sort=2&limit=1', '', function(body) {
                let data = JSON.parse(body).scratchpads[0];
                let embed = new Discord.RichEmbed();

                getKAData(message, labsApi, data.url.split('/')[5], function(body2) {
                    embed.setColor("#1b964a");
                    embed.setImage('https://www.khanacademy.org' + data.thumb);
                    embed.setURL(data.url);
                    embed.setTitle(data.title);
                    embed.addField('Author', data.authorNickname, true);
                    embed.addField('Votes', data.sumVotesIncremented.toLocaleString(), true);
                    embed.addField('Spinoffs', data.spinoffCount.toLocaleString(), true);
                    embed.addField('Flags', JSON.parse(body2).flags.length.toLocaleString(), true);
                    embed.setFooter(`Requested by ${message.author.username} at ${message.createdAt}`);
                    message.channel.send({ embed });
                });
            });
        }

        let currentTime;
        let run = setInterval(function() {
            currentTime = new Date().getSeconds(); // CHANGE
            if (currentTime % 10 === 0) {
                getProgram();
            }
            if (mode === 'stop') {
                clearInterval(run);
            }
        }, 1000);
    } else

    if (command === "restart") {
        if (!message.author.id == 218397146049806337) {
              message.reply(":x: Only Jett can restart the bot.");
              return;
          }
          message.channel.send("<a:loadinggif:406945578967367680> Restarting");
          client.user.setStatus("dnd");
          setTimeout(() => {
              process.exit(0);
          }, 1000);
    }
    /*
    else {
        let embed = new Discord.RichEmbed();
        embed.setColor('#ff0000');
        embed.addField('Error', 'That command is not defined. Use **`k.help`** for more.');
        message.channel.sendEmbed(embed);
    }*/
});

client.login(process.env.BOT_TOKEN)
    .then(() => console.log("Valid token"))
    .catch(() => console.log("Invalid token"));
