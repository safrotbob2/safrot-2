import axios from 'axios'

let handler = async (m, { conn, usedPrefix, command }) => {
    let cristiano = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/CristianoRonaldo.json`)).data  
    let ronaldo = await cristiano[Math.floor(cristiano.length * Math.random())]
    
    // إرسال الصورة مع زر
    conn.sendButton(m.chat, "*اتفضل يحب 😻*", ' [ 𝑺𝐴𝐹𝑅O𝑇-𝐵O𝑇 ]', ronaldo, [['تسجيل الدخول', `${usedPrefix + command}`]], m)
}

handler.help = ['رونالدو']
handler.tags = ['internet']
handler.command = /^(رونالدو|كرستيانو)$/i

export default handler
