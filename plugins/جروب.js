let handler = async (m, { conn, participants, groupMetadata }) => {

    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/admins.png'

    let text =`_الناس الي منورين:_\n *${groupMetadata.subject}*

${groupMetadata.desc?.toString() || 'غير معروف'}
`.trim()
const mentionedJid = groupMetadata.participants.map(v => v.id);
    conn.sendFile(m.chat, pp, 'pp.jpg', text, m, true, { mentions: mentionedJid})
}

handler.command = ['welcome', 'جروب', 'bienbenidos'] 
handler.group = true
handler.admin = true

export default handler
