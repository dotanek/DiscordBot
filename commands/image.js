const request = require('request');
const cheerio = require('cheerio');

module.exports = {
    name: 'image',
    usage: '.image [keywords]',
    description: 'Counts the amount of messages containing given word.',
    run: (msg,args) => {

        let keyword;
        let i = 0;
        
        while (typeof args[i] != 'undefined') {
            keyword = (i == 0 ? args[i] : keyword + " " + args[i]);
            i++;
        }

        if (typeof keyword == 'undefined') {
            msg.channel.send('Invalid arguments.');
            return;
        }

        let options = {
            url:'https://www.dogpile.com/serp?qc=images&q=' + keyword,
            method: 'GET',
            headers: {
                'Accept': 'text/html',
                'User-Agent': 'Chrome'
            }
        };
        
        request(options, (error,response,body) => {
            
            if (error) {
                msg.channel.send('There was an error connecting to image base.');
                console.log(error);
                return;
            }
            
            const $ = cheerio.load(response.body);
            let links = $('.image a.link');
            let urls = Array(links.length).fill(0).map((v,i) => links.eq(i).attr('href'));
        
            if (urls.length != 0) {
                msg.channel.send(urls[Math.floor(Math.random()*urls.length)]);
            } else {
                msg.channel.send('No results found.');
            }
        });
    }
}