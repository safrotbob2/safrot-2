let generateWAMessageFromContent = (await import(global.baileys)).default
import fs from 'fs'
import fetch from 'node-fetch'
import moment from 'moment-timezone'

let handler = async (m, { conn, args }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender
    let name = await conn.getName(who)
    let fsizedoc = '1'.repeat(10)
    let a = ['AED','AFN','ALL','AMD','ANG','AOA','ARS','AUD','AWG','AZN','BAM','BBD','BDT','BGN','BHD','BIF','BMD','BND','BOB','BOV','BRL','BSD','BTN','BWP','BYR','BZD','CAD','CDF','CHE','CHF','CHW','CLF','CLP','CNY','COP','COU','CRC','CUC','CUP','CVE','CZK','DJF','DKK','DOP','DZD','EGP','ERN','ETB','EUR','FJD','FKP','GBP','GEL','GHS','GIP','GMD','GNF','GTQ','GYD','HKD','HNL','HRK','HTG','HUF','IDR','ILS','INR','IQD','IRR','ISK','JMD','JOD','JPY','KES','KGS','KHR','KMF','KPW','KRW','KWD','KYD','KZT','LAK','LBP','LKR','LRD','LSL','LTL','LVL','LYD','MAD','MDL','MGA','MKD','MMK','MNT','MOP','MRO','MUR','MVR','MWK','MXN','MXV','MYR','MZN','NAD','NGN','NIO','NOK','NPR','NZD','OMR','PAB','PEN','PGK','PHP','PKR','PLN','PYG','QAR','RON','RSD','RUB','RWF','SAR','SBD','SCR','SDG','SEK','SGD','SHP','SLL','SOS','SRD','SSP','STD','SYP','SZL','THB','TJS','TMT','TND','TOP','TRY','TTD','TWD','TZS','UAH','UGX','USD','USN','USS','UYI','UYU','UZS','VEF','VND','VUV','WST','XAF','XAG','XAU','XBA','XBB','XBC','XBD','XCD','XDR','XFU','XOF','XPD','XPF','XPT','XTS','XXX','YER','ZAR','ZMW']
    let b = a[Math.floor(Math.random() * a.length)]
    //let ucapan = ucapan()
    let sap = ['مرحبا', 'صباح الخير', 'يا سلام', 'أهلاً', 'بوت']
    let sgh = md
    let sgc = nnn
    let gata = 'https://telegra.ph/file/c5325b68c797984847ba3.jpg'
    //let logo = 'https://i.pinimg.com/564x/f7/d2/e4/f7d2e48fd59a8c01cd396bfc70b0a2d1.jpg'
    let pp = await conn.profilePictureUrl(who).catch(_ => gata)

    global.fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "سلام" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:موبايل\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
}

handler.command = /^(fake|fkontak)$/i
export default handler

function ucapan() {
    const time = moment.tz('Asia/Cairo').format('HH') 
    let res = "👋 *أهلاً وسهلاً* 👋"
    if (time >= 4 && time < 11) {
        res = "🌇 *صباح الخير* ⛅"
    }
    if (time >= 11 && time < 15) {
        res = "🏙️ *مساء الخير* 🌤️"
    }
    if (time >= 15 && time < 17) {
        res = "🌆 *مساء الخير* 🌥️"
    }
    if (time >= 17) {
        res = "🌃 *مساء النور* 💫"
    }
    return res
	     }
