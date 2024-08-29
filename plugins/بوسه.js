import { sticker } from '../lib/sticker.js'
import fetch from 'node-fetch'
let MessageType = (await import(global.baileys)).default

let handler = async (m, { conn }) => {
  try {
    // لو الرسالة فيها شخص مذكور، نضيفه لقائمة الأشخاص المذكورين
    if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
    
    // لو مفيش أشخاص مذكورين، نضيف مرسل الرسالة لقائمة الأشخاص المذكورين
    if (!m.mentionedJid.length) m.mentionedJid.push(m.sender)
    
    // جلب صورة قبلة من API
    let res = await fetch('https://nekos.life/api/kiss')
    let json = await res.json()
    let { url } = json
    
    // إنشاء ملصق بالصورة وجملة التقبيل
    let stiker = await sticker(null, url, `+${m.sender.split('@')[0]} بيبوس ${m.mentionedJid.map((user) => (user === m.sender) ? 'حد ' : `+${user.split('@')[0]}`).join(', ')}`)
    
    // إرسال الملصق
    conn.sendFile(m.chat, stiker, 'sticker.webp', null, { asSticker: true }, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply: { showAdAttribution: false, title: wm, body: `h`, mediaType: 2, sourceUrl: nn, thumbnail: imagen1 } } }, { quoted: m })

    //conn.sendFile(m.chat, stiker, null, { asSticker: true })
  } catch (e) { }
}

handler.command = /^(بوسه|skiss|kis|besos|beso|besar|besando)$/i
export default handler
