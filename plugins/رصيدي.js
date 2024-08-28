import fetch from 'node-fetch'

let handler = async (m, { usedPrefix, conn }) => {	
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    
    let name = conn.getName(who) 
    let fkontak = { 
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
    
    let grupos = [nna, nn, nnn, nnnt]
    let gata = [img5, img6, img7, img8, img9]
    let pp = './media/menus/Menu1.jpg'
    
    let enlace = { 
        contextInfo: { 
            externalAdReply: {
                title: wm + ' ⚡', 
                body: 'مجموعة الدعم' , 
                sourceUrl: grupos.getRandom(), 
                thumbnail: await (await fetch(gata.getRandom())).buffer() 
            }
        }
    }
    
    let enlace2 = { 
        contextInfo: { 
            externalAdReply: { 
                showAdAttribution: true, 
                mediaUrl: yt, 
                mediaType: 'VIDEO', 
                description: '', 
                title: wm, 
                body: '𝑺𝐴𝐹𝑅O𝑇-𝐵O𝑇 ', 
                thumbnailUrl: await (await fetch(img)).buffer(), 
                sourceUrl: yt 
            }
        }
    }
    
    let dos = [enlace, enlace2]
    
    let user = global.db.data.users[who]
    let premium = user.premium
    const cartera = {
        economia: {
            exp: true,
            limit: true,
            money: true,
        },
    }
    const recursos = Object.keys(cartera.economia)
        .map(v => user[v] && `*${global.rpgshop.emoticon(v)} ⇢ ${user[v]}*`)
        .filter(v => v)
        .join('\n')
        .trim()
    
    let cart = `قائمة الاوامر 📜 ⇢ ${premium ? '✅' : '❌'}\n${wm}\n\n𝚄𝚂𝚄𝙰𝚁𝙸𝙾: ⇢ ${name}\n${recursos}`
    
    conn.sendMessage(m.chat, { image: { url: pp }, caption: cart, mentions: conn.parseMention(cart) }, { quoted: fkontak, ephemeralExpiration: 24 * 60 * 1000, disappearingMessagesInChat: 24 * 60 * 1000 })
}

handler.help = ['رصيدي', 'محفظتي', 'محفظة', 'رصيد'] // الأوامر باللغة العربية
handler.tags = ['xp']
handler.command = ['رصيدي', 'محفظتي', 'محفظة', 'رصيد'] // الأوامر باللغة العربية

export default handler
