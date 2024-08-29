import axios from 'axios';
import fetch from 'node-fetch';
import cheerio from 'cheerio';
import fs from 'fs';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `محتاج تدخل رابط.`;
  try {
    let res = await mediafireDl(args[0]);
    let { name, size, date, mime, link } = res;
    let caption = `
┃  *تفاصيل الملف* 
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ اسم الملف:
┃ ${name}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ الحجم:
┃ ${size}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ النوع:
┃ ${mime}`.trim();
    conn.reply(m.chat, caption, m, {
      contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, description: null, 
      title: '𝙎𝙖𝙛𝙧𝙤𝙩-𝙈𝘿',
      body: 'بوت سفروت',
      previewType: 0, thumbnail: fs.readFileSync("./media/menus/Menu3.jpg"),
      sourceUrl: `https://github.com/Wilsmac/FantasyBot-MD-v1` }}});
    await conn.sendFile(m.chat, link, name, '', m, null, { mimetype: mime, asDocument: true });
  } catch (e) {
    await conn.reply(m.chat, `حدث خطأ، حاول تاني بعدين. #report ${usedPrefix + command}\n\nالتفاصيل: ${e}`, m);
    console.log(`❗❗ حدث خطأ أثناء تنفيذ الأمر ${usedPrefix + command} ❗❗`);
    console.log(e);
    handler.limit = false;
  }
};

handler.help = ['ميديافاير'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(ميديافاير|mediafiredl|dlmediafire)$/i;

handler.limit = true;
export default handler;

async function mediafireDl(url) {
  const res = await axios.get(`https://www-mediafire-com.translate.goog/${url.replace('https://www.mediafire.com/','')}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`);
  const $ = cheerio.load(res.data);
  const link = $('#downloadButton').attr('href');
  const name = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').attr('title').replaceAll(' ','').replaceAll('\n','');
  const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text();
  const size = $('#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '').replaceAll(' ','');
  let mime = '';
  let rese = await axios.head(link);
  mime = rese.headers['content-type'];
  return { name, size, date, mime, link };
         }
