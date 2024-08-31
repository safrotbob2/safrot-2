var handler = async (m, { conn, usedPrefix, text }) => {

let { key } = await conn.sendMessage(m.chat, { text: 'الآن سأرسل لك رسالة' }, { quoted: m })
const array = [
'8==👊==D', '8===👊=D', '8=👊===D', '8=👊===D', '8==👊==D', '8===👊=D', '8=👊===D', '8==👊==D', '8===👊=D', '8=👊===D', '8==👊==D', '8===👊=D', '8===👊=D💦'
]

for (let item of array) {
await conn.sendMessage(m.chat, { text: `${item}`, edit: key }, { quoted: m })
await new Promise(resolve => setTimeout(resolve, 40)) // تأخير 40 ميلي ثانية
}
return conn.sendMessage(m.chat, { text: `أوه ${text} انتهى! 😋💦`.trim() , edit: key, mentions: [m.sender] }, { quoted: m })

}
handler.help = ['فاب']
handler.tags = ['ألعاب']
handler.command = /^(سيجا|سيرا|فاب)$/i;

export default handler
