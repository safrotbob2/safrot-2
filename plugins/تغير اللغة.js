import translate from '@vitalets/google-translate-api'
import * as fs from 'fs'
import { es, en, id, ar, pt } from '../lib/idiomas/total-idiomas.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {

let fkontak = { 
    "key": { 
        "participants":"0@s.whatsapp.net", 
        "remoteJid": "status@broadcast", 
        "fromMe": false, 
        "id": "Halo" 
    }, 
    "message": { 
        "contactMessage": { 
            "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
        }
    }, 
    "participant": "0@s.whatsapp.net" 
}

let bot = `اللغة تم تغييرها بنجاح.`
let bot2 = `اختار اللغة اللي عايز تستخدمها.`
let bot3 = `الأوامر مش هتغير اللغة الحالية، بس الرسائل هي اللي هتتغير.`
let idioma = await translate(`${bot}`, { to: args[0], autoCorrect: true })
let idioma2 = await translate(`${bot2}`, { to: lenguajeCD.lenguaje(), autoCorrect: true })
let idioma3 = await translate(`${bot3}`, { to: lenguajeCD.lenguaje(), autoCorrect: true })

try {  
if (args[0] == 'es'){
global.lenguajeGB = es
await conn.sendButton(m.chat, lenguajeCD['smsAvisoEG']() + idioma.text + '\n' + 'Español', igfg, null, [[`القائمة ☃️`, `${usedPrefix}menu`]], fkontak, m)

}else if (args[0] == 'en'){
global.lenguajeGB = en
await conn.sendButton(m.chat, lenguajeCD['smsAvisoEG']() + idioma.text + '\n' + 'English', igfg, null, [[`القائمة ☃️`, `${usedPrefix}menu`]], fkontak, m)

}else if (args[0] == 'id'){
global.lenguajeGB = id
await conn.sendButton(m.chat, lenguajeCD['smsAvisoEG']() + idioma.text + '\n' + 'Bahasa Indonesia', igfg, null, [[`القائمة ☃️`, `${usedPrefix}menu`]], fkontak, m)

}else if (args[0] == 'ar'){
global.lenguajeGB = ar
await conn.sendButton(m.chat, lenguajeCD['smsAvisoEG']() + idioma.text + '\n' + 'عربي', igfg, null, [[`القائمة ☃️`, `${usedPrefix}menu`]], fkontak, m)

}else if (args[0] == 'pt'){
global.lenguajeGB = pt
await conn.sendButton(m.chat, lenguajeCD['smsAvisoEG']() + idioma.text + '\n' + 'Português', igfg, null, [[`القائمة ☃️`, `${usedPrefix}menu`]], fkontak, m)
}else{

const sections = [{
title: 'اللغات المتاحة حالياً',
rows: [
   {header: "⚠︎ Español", title: "", id: `${usedPrefix + command} es`, description: ``},
   {header: "⚠︎ English", title: "", id: `${usedPrefix + command} en`, description: ``},
   {header: "⚠︎ Bahasa Indonesia", title: "", id: `${usedPrefix + command} id`, description: ``},
   {header: "⚠︎ عربي", title: "", id: `${usedPrefix + command} ar`, description: ``},
   {header: "⚠︎ Português", title: "", id: `${usedPrefix + command} pt`, description: ``}
]}]

const listMessage = {
text: idioma2.text + '\n\n' + idioma3.text,
footer: `➥ Español = ${usedPrefix + command} es
➥ English = ${usedPrefix + command} en
➥ Bahasa Indonesia = ${usedPrefix + command} id
➥ عربي = ${usedPrefix + command} ar
➥ Português = ${usedPrefix + command} pt\n\n` + wm,
title: `${htki} اللغة ☃️`,
buttonText: `اختر`,
sections }
await conn.sendList(m.chat, listMessage, {quoted: fkontak})
}
}catch(e){
await m.reply(`${fg}\`مش قادر أغير اللغة، لو المشكلة مستمرة اعمل تقرير باستخدام: ${usedPrefix}reporte\``) 
console.log(e) 
}}

handler.command = /^(اللغة|idioma|languaje|languages)$/i

export default handler
