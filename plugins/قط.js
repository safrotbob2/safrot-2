import fetch from 'node-fetch'
let handler  = async (m, { conn, text }) => {
try {
let res = await fetch('https://cataas.com/cat')
let img = await res.buffer()
let caption = `
 𝑺𝐴𝐹𝑅O𝑇-𝐵O𝑇
`.trim()
conn.sendFile(m.chat, img, 'cat.jpg', caption, m)
} catch (e) {
console.log(e)
throw '*\`『 حدث خطاء 🥺 』\`*'
}}
handler.help = ['قط']
handler.tags = ['random']
handler.command = /^قط$/i
handler.fail = null
export default handler
