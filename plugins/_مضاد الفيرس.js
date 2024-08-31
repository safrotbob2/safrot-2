import * as fs from 'fs'

export async function before(m, { conn, isAdmin, isBotAdmin, text, participants, usedPrefix }) {
    if (m.isBaileys && m.fromMe) return !0
    if (!m.isGroup) return !1

    const groupAdmins = participants.filter(p => p.admin)
    const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n')

    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    let delet = m.key.participant
    let bang = m.key.id
    let name = await conn.getName(m.sender)
    
    let fakemek = {
        key: { participant: "0@s.whatsapp.net", "remoteJid": "0@s.whatsapp.net" },
        message: {
            groupInviteMessage: {
                groupJid: "51995386439-1616969743@g.us",
                inviteCode: "m",
                groupName: "P",
                caption: '𝑺𝐴𝐹𝑅O𝑇-𝐵O𝑇',
                jpegThumbnail: null
            }
        }
    }

    if (chat.antiTraba && m.text.length > 4000) { // عدد الأحرف الأقصى المسموح به في الرسالة
        if (isAdmin) {
            return conn.sendMessage(m.chat, { text: `*أنت مدير في المجموعة، الرسالة الطويلة مسموحة.*`, mentions: [m.sender] }, { quoted: fakemek })
        }
        
        if (!isBotAdmin) {
            return conn.sendMessage(m.chat, { text: `*تم إرسال رسالة طويلة جداً، سيتم إخطار جميع المدراء* \n\n${listAdmin}\n\n*لذا يرجى عدم إرسال رسائل طويلة جداً.*`, mentions: [...groupAdmins.map(v => v.id)] }, { quoted: m })
        }

        if (isBotAdmin) {
            conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } })
            setTimeout(() => {   
                conn.sendMessage(m.chat, { text: `*تم اكتشاف رسالة تحتوي على الكثير من الأحرف، وسيتم حذفها.*\n${"\n".repeat(400)}\n• *تمت إزالة الشخص الذي أرسل الرسالة.*`, mentions: [m.sender] }, { quoted: fakemek })
            }, 0)
            setTimeout(() => { 
                conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
            }, 1000)
        } else if (!bot.restrict) {
            return m.reply(`*يمكنك فقط استخدام الأوامر كمالك للبوت.*`)
        }
    }
    
    return !0
          }
