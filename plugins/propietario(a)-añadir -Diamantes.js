let MessageType = (await import(global.baileys)).default
let pajak = 0
let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw '*\`『 اعمل منشن للي عايز تضفلو ماسش 』\`*'
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw `ياريت تدخل عدد الماس اللي عايز تضيفه`
    if (isNaN(txt)) throw `يجب إدخال أرقام فقط`
    let dmt = parseInt(txt)
    let limit = dmt
    let pjk = Math.ceil(dmt * pajak)
    limit += pjk
    if (limit < 1) throw `أقل عدد ممكن للماس اللي تقدر تضيفه هو 1`
    let users = global.db.data.users
    users[who].limit += dmt
    m.reply(`𝐃𝐈𝐀𝐌𝐀𝐍𝐓𝐄𝐒\n┃\n┃ *لـ:*\n┃ღ *${text}*\n┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n┃ღ 𝑺𝐴𝐹𝑅O𝑇-𝐵O𝑇\n┃ღ *${dmt} ماس*\n----------------`)
}

handler.help = ['adddi <@user>']  // إضافة ماس لشخص معين
handler.tags = ['xp']  // التصنيف: خبرة (XP)
handler.command = ['أضفماس', 'ضيف-ماس', 'ضيفماس']  // أوامر التشغيل
handler.group = true
handler.rowner = true

export default handler
