let handler = async (m, { conn, isPrems }) => { // lastmiming
    const fkontak = {
        "key": {
            "participants": "0@s.whatsapp.net",
            "remoteJid": "status@broadcast",
            "fromMe": false,
            "id": "Halo"
        },
        "message": {
            "contactMessage": {
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        },
        "participant": "0@s.whatsapp.net"
    }

    let user = global.db.data.users[m.sender]
    let premium = user.premium
    let minar = `${pickRandom(['برافو 😎 عملت تعدين',
        '🌟✨ ممتاز!! حصلت على',
        'WOW!! انت معدّن شاطر ⛏️ حصلت على',
        'عملت تعدين!!',
        '😲 نجحت في تعدين كمية من',
        'دخلِك هيزيد علشان عملت تعدين',
        '⛏️⛏️⛏️⛏️⛏️ بتعدين',
        '🤩 يييي!! دلوقتي معاك',
        'التعدين في صفك، علشان كده حصلت على',
        '😻 حظ تعدين',
        '♻️ مهمتك اتنفذت، قدرت تعّدِن',
        '⛏️ التعدين فادك بـ',
        '🛣️ لقيت مكان وبتعدين فيه حصلت على',
        '👾 علشان عملت تعدين دخلِك زاد',
        'مبروك!! دلوقتي معاك', '⛏️⛏️⛏️ حصلت على'])}`

    let pp = 'https://us.123rf.com/450wm/emojiimage/emojiimage1802/emojiimage180200332/95468325-mont%C3%B3n-de-piedras-preciosas-diamantes-azules-brillantes-concepto-de-joyas-caras-s%C3%ADmbolo-de-riqueza-d.jpg?ver=6'

    let kyubi = `${pickRandom([0, 1, 3, 1, 2])}` * 1
    let kyubipremium = `${pickRandom([2, 3, 5, 9, 10, 7])}` * 1

    let diamond = `${pickRandom([0, 1, 0, 0, 2])}` * 1
    let diamondpremium = `${pickRandom([3, 4, 5, 5, 5])}` * 1

    let tiketcoin = `${pickRandom([1, 0, 0, 1, 0, 0, 2])}` * 1
    let tiketcoinpremium = `${pickRandom([2, 3, 4, 5, 2, 3, 3])}` * 1

    const recompensas = {
        kyubi: premium ? kyubipremium : kyubi,
        diamond: premium ? diamondpremium : diamond,
        tiketcoin: premium ? tiketcoinpremium : tiketcoin,
    }

    let limit = `${pickRandom([2, 3, 4, 5, 0, 1, 6, 7, 8, 9, 10])}` * 1
    let limitpremium = `${pickRandom([4, 7, 8, 9, 11, 13, 16, 17, 19, 22, 24, 26, 28, 30])}` * 1

    let time = user.lastdiamantes + 900000 //15 min
    if (new Date - user.lastdiamantes < 900000) return await conn.reply(m.chat, `*⏱️ هترجع بعد ${msToTime(time - new Date())} علشان تكمل تعدين ${global.rpgshopp.emoticon('limit')}⛏️*\n\n*رجع بعد ${msToTime(time - new Date())} علشان تعدين ${global.rpgshopp.emoticon('limit')}⛏️*`, fkontak, m)
    user.limit += premium ? limitpremium : limit
    let texto = ''
    for (let reward of Object.keys(recompensas)) {
        if (!(reward in user)) continue
        user[reward] += recompensas[reward]
        texto += `+${recompensas[reward]} ${global.rpgshop.emoticon(reward)}\n`
    }

    let gat = `*${premium ? '🎟️ مكافأة مميزة' : '🆓 مكافأة مجانية'}*\n*${minar}*\n*${limit} ${global.rpgshop.emoticon('limit')}*\n\n🍁 𝗕 𝗢 𝗡 𝗢\n\n${texto}\n\n🎟️ 𝗣 𝗥 𝗘 𝗠 𝗜 𝗨 𝗠 ⇢ ${premium ? '✅' : '❌'}\n${wm}`
    await conn.sendFile(m.chat, pp, 'gata.jpg', gat, fkontak)
    user.lastdiamantes = new Date * 1
}
handler.help = ['تعدين']
handler.tags = ['diamantes']
handler.command = ['تعدين', 'miming3', 'mine3', 'minardiamantes', 'minargemas', 'minardiamante']
handler.fail = null
handler.exp = 0
export default handler

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    return minutes + " د و " + seconds + " ث "
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
