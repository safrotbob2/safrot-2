const toxicRegex = /كسمك|كسختك يا ابن العرص|هنيكك|هنيك|كسمك|هنيك اختك|هفشخك|يمتناك|عرص|مصمص|لف انيكك|متيجي انيكك|ينعل دين امك|امك شرموطه|شرموطه|متناكه|فجره لبوه|يا ابن البوه|يا ابن العاهره|يا ابن الشرموطه|يا معرص|يا علق|يا مومس|يا خول|يا متناك|يا معرص|يا خول|خول|متناك|منيوك|متبعبص|ابعبص|امك انيك|امك انيكك|كسم الجروي|كسم السيسي|كسم مصر|كسم البضان|كسم امك|كسم/i

export async function before(m, { conn, isAdmin, isBotAdmin, isOwner }) {
 
if (m.isBaileys && m.fromMe)
return !0
if (!m.isGroup)
return !1
  let user = global.db.data.users[m.sender]
  let chat = global.db.data.chats[m.chat]
  let bot = global.db.data.settings[this.user.jid] || {}
  let img = 'https://i.imgur.com/5Q1MqGD.jpg'
 const isToxic = toxicRegex.exec(m.text)
    
if (isToxic && chat.antitoxic && !isOwner && !isAdmin) {
user.warn += 1
if (!(user.warn >= 4)) await m.reply(`${user.warn == 1 ? `*@${m.sender.split`@`[0]}*` : `*@${m.sender.split`@`[0]}*`}, ${lenguajeGB['smsToxic1']()} (${isToxic}) ${lenguajeGB['smsToxic2']()} ${lenguajeGB['smsToxic3']()} *${user.warn}/4*\n\n${wm}`, false, { mentions: [m.sender] })

if (user.warn >= 4) {
user.warn = 0
await m.reply(`*${lenguajeGB['smsToxic6']()}*\n*@${m.sender.split`@`[0]} ${lenguajeGB['smsToxic7']()}*`, false, { mentions: [m.sender] })
user.banned = true
await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
return !1
              }
