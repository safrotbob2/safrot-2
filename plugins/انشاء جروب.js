let handler = async (m, { conn: natsuki, text }) => {

if (!text) 
  return m.reply('*\`『 هات اسم الجروب علشان اعملو 』\`*')
try {
    m.react('⚙️')
    m.reply('جاري إنشاء المجموعة...')

    let natsuki2 = await natsuki.groupCreate(text, [m.sender])
    let lik = await natsuki.groupInviteCode(natsuki2.gid)

    let invite = 'https://chat.whatsapp.com/' + lik

    m.reply('*الدعوة:* ' + invite)
} catch (e) {
    m.reply('حصل خطأ غير متوقع')
}
}

handler.help = ['creargc *<اسم>*']
handler.tags = ['owner']
handler.command = /^(جروب|creargrupo|creargroup)$/
handler.owner = true
export default handler
