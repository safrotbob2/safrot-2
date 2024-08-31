import { toAudio } from '../lib/converter.js' 

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    
    if (!/video|audio/.test(mime)) throw '*\`『 اعمل ريب ع الفديو الي هحولو لي صوت🧚🏻‍♂️ 』\`*'

    await conn.sendPresenceUpdate('recording', m.chat)
    let media = await q.download?.()

    if (!media && !/video/.test(mime)) throw `مش لاقي الملف، تأكد إنه فيديو وحاول تاني.`
    if (!media && !/audio/.test(mime)) throw `مش لاقي الملف، تأكد إنه صوت وحاول تاني.`

    let audio = await toAudio(media, 'mp4')

    if (!audio.data && !/audio/.test(mime)) throw `مش قادر أحول الملف لصوت، تأكد إنه ملف صوتي.`
    if (!audio.data && !/video/.test(mime)) throw `مش قادر أحول الملف لصوت، تأكد إنه ملف فيديو.`

    conn.sendFile(m.chat, audio.data, 'error.mp3', '', m, null, { mimetype: 'audio/mp4' })
}

handler.help = ['لصوت (رد)']
handler.tags = ['الصوت']
handler.command = ['لصوت', 'تحويل_الصوت', 'mp3']

export default handler
