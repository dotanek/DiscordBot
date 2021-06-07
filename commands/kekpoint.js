var Jimp = require('jimp');
const fs = require('fs');
const request = require('request');

const size = 64;

module.exports = {
    name: 'kekpoint',
    usage: '.kekpoint [user]',
    description: 'Kekpoints that mf.',
    run: async (msg,arg) => {
        if (arg.length == 0) {
            return msg.channel.send('Invalid arguments.');
        } else if (arg.length > 0){
            if (msg.mentions.users.size == 0) {
                return msg.channel.send('Invalid arguments.');
            }
        } else {
            return msg.channel.send('Invalid arguments.');
        }

  
        let userImg;
        let userWidth;

        let targetUser = msg.mentions.users.first();

        if (targetUser.avatarURL() == null) {
            let text = targetUser.username;

            await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(font => {
                userWidth = Jimp.measureText(font, text);
                userImg = new Jimp(userWidth,size);
                userImg.print(
                    font,
                    0,
                    0,
                    {
                      text: text,
                      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                    },
                    userWidth,
                    size
                  );
            });
        } else {
            userImg = await Jimp.read(
                targetUser.avatarURL().replace('.webp','.png')
            );
            await userImg.resize(size, size);
            userWidth = size;
        }
        
        let kekImg = await Jimp.read('resources/kekpoint/kekpoint.png');
        await kekImg.resize(size, size);

        let resultImg = new Jimp(size + userWidth, size);
        await resultImg.composite(kekImg,0,0, {
            mode: Jimp.BLEND_SOURCE_OVER
        });

        await resultImg.composite(userImg,size,0, {
            mode: Jimp.BLEND_SOURCE_OVER
        });

        await resultImg.write('./temp/result.png');
        msg.channel.send({files: ['./temp/result.png']});
    }
}