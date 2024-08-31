let linkRegex = /\b((https?:\/\/|www\.)?[\w-]+\.[\w-]+(?:\.[\w-]+)*(\/[\w\.\-\/]*)?)\b/i
let handler = m => m
handler.before = async function (m, { isAdmin, isBotAdmin, isOwner, isROwner, participants }) {
    if (!m.isGroup) return 
    if (!isAdmin || !isOwner || !isROwner || m.fromMe || !isBotAdmin) return

    let chat = global.db.data.chats[m.chat]
    let delet = m.key.participant
    let bang = m.key.id
    const user = `@${m.sender.split`@`[0]}`
    let bot = global.db.data.settings[this.user.jid] || {}
    const isGroupLink = linkRegex.exec(m.text) 

    if (chat.antiLink2 && isGroupLink !== null) {
        if (chat.delete) return conn.sendMessage(m.chat, { text: `⛔️ تحذير: الروابط ممنوعة هنا.`, mentions: [m.sender] }, { quoted: m }) 
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
            if (m.text.includes(linkThisGroup)) return !0
        }     
        if (isBotAdmin) {
            await conn.sendMessage(m.chat, { text: `🚫 ${user} حاول ينشر رابط.`, mentions: [m.sender] }, { quoted: m })    
            await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})
            let remove = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
            if (remove[0].status === '404') return
        }
    }
    return !0
}
export default handler
