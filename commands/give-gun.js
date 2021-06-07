var Jimp = require('jimp');
const fs = require('fs');
const request = require('request');

let regex = /^\<\@\!?[0-9]*\>$/g;

module.exports = {
    name: 'give-gun',
    usage: '.give-gun [user] [left/right]',
    description: 'Adds a gun to given users avatar.',
    run: async (msg,arg) => {

        console.log(arg);

        if (arg.length === 0) {
            return msg.channel.send('Invalid arguments.');
        }

        if (typeof arg[0] == 'undefined' || msg.mentions.users.size === 0) {
            return msg.channel.send('Invalid arguments.');
        }

        if (arg[1] === 'left' || arg[1] === 'right') {
            return runDefault(msg,msg.mentions.users.first(),arg[1]);
        }

        if (
            Number.isInteger(parseInt(arg[1])) &&
            Number.isInteger(parseInt(arg[2])) &&
            arg[3] === 'left' || arg[3] === 'right'
        ) {
            return runManual(msg,msg.mentions.users.first(),arg[1],arg[2],arg[3]);
        }

        return msg.channel.send('Invalid arguments.');
    }
}

runDefault = async (msg,targetUser,direction) => {
    if (targetUser.avatarURL() == null) {
        return msg.channel.send('Given user does not have an avatar.');
    }

    let avatar = await Jimp.read(
        targetUser.avatarURL().replace('.webp','.png')
    );

    let gun = await Jimp.read('resources/give-gun/gun.png');

    let avatarSize = avatar.bitmap.width;
    let gunSize = avatarSize/2;
    await gun.resize(Jimp.AUTO, gunSize);

    if (direction === 'right') {
        await gun.flip(true,false);
        await avatar.composite(gun,avatarSize-gun.bitmap.width,avatarSize/2,{
            mode: Jimp.BLEND_SOURCE_OVER
        });
    } else {
        await avatar.composite(gun,0,avatarSize/2,{
            mode: Jimp.BLEND_SOURCE_OVER
        });
    }

    await avatar.write('./temp/avatar.png');
    return msg.channel.send({files: ['./temp/avatar.png']});
}


runManual = async (msg,targetUser,x,y,direction) => {
    if (targetUser.avatarURL() == null) {
        return msg.channel.send('Given user does not have an avatar.');
    }

    let avatar = await Jimp.read(
        targetUser.avatarURL().replace('.webp','.png')
    );

    let gun = await Jimp.read('resources/give-gun/gun.png');

    let avatarSize = avatar.bitmap.width;
    let gunSize = avatarSize/2;
    await gun.resize(Jimp.AUTO, gunSize);

    offsetX = x/100 * avatarSize;
    offsetY = y/100 * avatarSize;

    if (direction === 'right') {
        await gun.flip(true,false);
    }

    await avatar.composite(gun,offsetX,offsetY,{
        mode: Jimp.BLEND_SOURCE_OVER
    });

    await avatar.write('./temp/avatar.png');
    return msg.channel.send({files: ['./temp/avatar.png']});
}
