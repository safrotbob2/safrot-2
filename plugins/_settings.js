import fetch from 'node-fetch'
import moment from 'moment-timezone'
import axios from 'axios'
import fs from 'fs'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto }  = (await import(global.baileys))

var handler = m => m
handler.all = async function (m) {

//------------------------------------------------

global.قناةوهمية = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363192435027853@newsletter', newsletterName: "『✯ بوت سفروت الفقدان 』", serverMessageId: -1 }
}}, { quoted: m }

//-----------------------------------------------

global.قناةوهميةبالتفاصيل = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363192435027853@newsletter', newsletterName: "『✯ بوت سفروت الفقدان 』", serverMessageId: -1 }, forwardingScore: 999, externalAdReply: { title: gt, body: wm, thumbnailUrl: fantasyImg.getRandom(), sourceUrl: md, mediaType: 1, renderLargerThumbnail: false
}}}, { quoted: m }

//--------------------------------------------------
var قنوات = [
{ link: قناةرسمية, id: "120363192435027853@newsletter", name: "『✯ بوت سفروت الفقدان 』" }]
var قنواتوا = قنوات

global.قناةواتساب = { contextInfo: { mentionedJid: null, forwardingScore: 1, isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: قنواتوا.id, serverMessageId: '', newsletterName: قنواتوا.name }, externalAdReply: { title: wm, body: gt, mediaType: 1, renderLargerThumbnail: false, previewType: `PHOTO`, thumbnailUrl: fantasyImg.getRandom(), thumbnail: imagen1, sourceUrl: قناةرسمية }}}, { quoted: m }

}
export default handler
