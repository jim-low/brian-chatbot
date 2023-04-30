const { BotkitConversation } = require('botkit')
const locationList = require('../bot/locations.json')


module.exports = function(controller) {
    const location = new BotkitConversation('location', controller);
    
    location.ask('We have many shops around malaysia, Please tell me your city or state and I will search for nearby Amway shops.', [
        //Malaysia
        {
            pattern: 'Malaysia',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('all-location');
            }
        },

        {
            pattern: 'All',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('all-location');
            }
        },
        
        //Cities
        {
            pattern: 'Alor Setar',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('alor-setar-location');
            }
        },
        {
            pattern: 'Batu Pahat',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('batu-pahat-location');
            }
        },
        {
            pattern: 'Bintulu',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('bintulu-location');
            }
        },
        {
            pattern: 'Ipoh',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('ipoh-location');
            }
        },
        {
            pattern: 'Johor Bahru',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('johor-bahru-location');
            }
        },
        {
            pattern: 'Kota Kinabalu',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('kota-kinabalu-location');
            }
        },
        {
            pattern: 'Kuala Terangganu',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('kuala-terangganu-location');
            }
        },
        {
            pattern: 'Kuantan',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('kuantan-location');
            }
        },
        {
            pattern: 'Kuching',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('kuching-location');
            }
        },
        {
            pattern: 'Malim Jaya',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('malim-jaya-location');
            }
        },
        {
            pattern: 'Miri',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('miri-location');
            }
        },
        {
            pattern: 'Jelutong',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('jelutong-location');
            }
        },
        {
            pattern: 'Petaling Jaya',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('petaling-jaya-location');
            }
        },
        {
            pattern: 'Perai',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('perai-location');
            }
        },
        {
            pattern: 'Prai',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('perai-location');
            }
        },
        {
            pattern: 'Sandakan',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('kedah-location');
            }
        },
        {
            pattern: 'Seremban',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('seremban-location');
            }
        },
        {
            pattern: 'Wangsa Maju',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('wangsa-maju-location');
            }
        },

        //States
        {
            pattern: 'Kedah',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('kedah-location');
            }
        },
        {
            pattern: 'Johor',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('johor-location');
            }
        },
        {
            pattern: 'Sarawak',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('sarawak-location');
            }
        },
        {
            pattern: 'Kelantan',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('kelantan-location');
            }
        },
        {
            pattern: 'Perak',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('perak-location');
            }
        },
        {
            pattern: 'Sabah',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('sabah-location');
            }
        },
        {
            pattern: 'Pahang',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('pahang-location');
            }
        },
        {
            pattern: 'Melaka',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('melaka-location');
            }
        },
        {
            pattern: 'Pulau Pinang',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('pulau-pinang-location');
            }
        },
        {
            pattern: 'Penang',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('pulau-pinang-location');
            }
        },
        {
            pattern: 'Selangor',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('selangor-location');
            }
        },
        {
            pattern: 'Negeri Sembilan',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('negeri-sembilan-location');
            }
        },
        {
            pattern: 'Kuala Lumpur',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('kuala-lumpur-location');
            }
        },
        {
            pattern: 'Terangganu',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('terangganu-location');
            }
        },
        {
            pattern: 'Melaka',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('melaka-location');
            }
        },
        {
            pattern: '',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('undefined-location');
            }
        },



    ],{key: 'country'});

    //Malaysia
    location.addMessage('We have too much shops in Malaysia, Im not doing that.', 'all-location');

    //Cities
    location.addMessage('Alright, Here are the shops i can find in Alor Setar.', 'alor-setar-location');
    location.addMessage(locationList.kedah.at(0).alorSetar, 'alor-setar-location');

    location.addMessage('Alright, Here are the shops i can find in batu Pahat.', 'batu-pahat-location');
    location.addMessage(locationList.johor.at(0).batuPahat, 'batu-pahat-location');

    location.addMessage('Alright, Here are the shops i can find in Alor Setar.', 'alor-setar-location');
    location.addMessage(locationList.johor.at(0).johorBahru, 'alor-setar-location');

    location.addMessage('Alright, Here are the shops i can find in Bintulu.', 'bintulu-location');
    location.addMessage(locationList.sarawak.at(0).bintulu, 'bintulu-location');

    location.addMessage('Alright, Here are the shops i can find in Kuching.', 'kuching-location');
    location.addMessage(locationList.sarawak.at(0).kuching, 'kuching-location');

    location.addMessage('Alright, Here are the shops i can find in Miri.', 'miri-location');
    location.addMessage(locationList.sarawak.at(0).miri, 'miri-location');

    location.addMessage('Alright, Here are the shops i can find in Ipoh.', 'ipoh-location');
    location.addMessage(locationList.perak.at(0).ipoh, 'ipoh-location');

    location.addMessage('Alright, Here are the shops i can find in Perak.', 'kota-kinabalu-location');
    location.addMessage(locationList.sabah.at(0).kotaKinabalu, 'kota-kinabalu-location');

    location.addMessage('Alright, Here are the shops i can find in Sandakan.', 'sandakan-location');
    location.addMessage(locationList.sabah.at(0).sandakan, 'sandakan-location');

    location.addMessage('Alright, Here are the shops i can find in Kuala Terengganu.', 'kuala-terengganu-location');
    location.addMessage(locationList.terengganu.at(0).kualaTerengganu, 'kuala-terengganu-location');

    location.addMessage('Alright, Here are the shops i can find in Kuantan.', 'kuantan-location');
    location.addMessage(locationList.pahang.at(0).kuantan, 'kuantan-location');

    location.addMessage('Alright, Here are the shops i can find in Malim Jaya.', 'malim-jaya-location');
    location.addMessage(locationList.melaka.at(0).MalimJaya, 'malim-jaya-location');

    location.addMessage('Alright, Here are the shops i can find in Pulau Pinang.', 'jelutong-location');
    location.addMessage(locationList.pulauPinang.at(0).Jelutong, 'jelutong-location');

    location.addMessage('Alright, Here are the shops i can find in Perai.', 'perai-location');
    location.addMessage(locationList.pulauPinang.at(0).Perai, 'perai-location');

    location.addMessage('Alright, Here are the shops i can find in Seremban.', 'seremban-location');
    location.addMessage(locationList.negeriSembilan.at(0).seremban, 'seremban-location');

    location.addMessage('Alright, Here are the shops i can find in Wangsa Maju.', 'wangsa-maju-location');
    location.addMessage(locationList.kualaLumpur.at(0).wangsaMaju, 'wangsa-maju-location');

    location.addMessage('Alright, Here are the shops i can find in Petaling Jaya.', 'petaling-jaya-location');
    location.addMessage(locationList.selangor.at(0).petalingJaya, 'petaling-jaya-location');

    //States
    location.addMessage('Alright, Here are the shops i can find in Kedah.', 'kedah-location');
    location.addMessage(locationList.kedah.at(0).alorSetar, 'kedah-location');
    
    location.addMessage('Alright, Here are the shops i can find in Johor.', 'johor-location');
    location.addMessage(locationList.johor.at(0).batuPahat, 'johor-location');
    location.addMessage(locationList.johor.at(0).johorBahru, 'johor-location');
    location.addMessage(locationList.johor.at(0).nusaBestari, 'johor-location');

    location.addMessage('Alright, Here are the shops i can find in Sarawak.', 'sarawak-location');
    location.addMessage(locationList.sarawak.at(0).bintulu, 'sarawak-location');
    location.addMessage(locationList.sarawak.at(0).kuching, 'sarawak-location');
    location.addMessage(locationList.sarawak.at(0).miri, 'sarawak-location');

    location.addMessage('Alright, Here are the shops i can find in Perak.', 'perak-location');
    location.addMessage(locationList.perak.at(0).ipoh, 'perak-location');

    location.addMessage('Alright, Here are the shops i can find in Sabah.', 'sabah-location');
    location.addMessage(locationList.sabah.at(0).kotaKinabalu, 'sabah-location');
    location.addMessage(locationList.sabah.at(0).sandakan, 'sabah-location');

    location.addMessage('Alright, Here are the shops i can find in Terengganu.', 'terengganu-location');
    location.addMessage(locationList.terengganu.at(0).kualaTerengganu, 'terengganu-location');

    location.addMessage('Alright, Here are the shops i can find in Pahang.', 'pahang-location');
    location.addMessage(locationList.pahang.at(0).kuantan, 'pahang-location');

    location.addMessage('Alright, Here are the shops i can find in Melaka.', 'melaka-location');
    location.addMessage(locationList.melaka.at(0).MalimJaya, 'melaka-location');

    location.addMessage('Alright, Here are the shops i can find in Pulau Pinang.', 'pulau-pinang-location');
    location.addMessage(locationList.pulauPinang.at(0).Jelutong, 'pulau-pinang-location');
    location.addMessage(locationList.pulauPinang.at(0).Perai, 'pulau-pinang-location');

    location.addMessage('Alright, Here are the shops i can find in Negeri Sembilan.', 'negeri-sembilan-location');
    location.addMessage(locationList.negeriSembilan.at(0).seremban, 'negeri-sembilan-location');

    location.addMessage('Alright, Here are the shops i can find in Kuala Lumpur.', 'kuala-lumpur-location');
    location.addMessage(locationList.kualaLumpur.at(0).wangsaMaju, 'kuala-lumpur-location');

    location.addMessage('Alright, Here are the shops i can find in Selangor.', 'selangor-location');
    location.addMessage(locationList.selangor.at(0).petalingJaya, 'selangor-location');

    location.addMessage('Sorry, I can not find any shops with the state/city you mentioned, if it even exists..', 'undefined-location');
    
    location.after(async(results, bot) => {
        const name = results.name;
    });
    
    // add the conversation to the dialogset
    controller.addDialog(location);
    
    // launch the dialog in response to a message or event
    controller.hears(['shops','facilities', 'facility'], 'message', async(bot, message) => {
        await bot.changeContext(message.reference)
        bot.beginDialog('location');
    });
}   