.ww g import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

const estilo2 = {
  title: "عنوان",
  footer: "تذييل",
  buttonText: "زر",
};

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) throw `> ⓘ اكتب اسم الي عايز تشغلو معا الامر `;

  try {
    const yt_play = await search(args.join(' '));
    const texto1 = `
◡̈⃝➥ *\`『 العنوان 』\`*
   ${yt_play[0].title}
─━━━━┉❈⏤͟͟͞͞★꙲⃝͟
◡̈⃝➥ *\`『 منشور 』\`*
  ${yt_play[0].ago}
─━━━━┉❈⏤͟͟͞͞★꙲⃝͟
◡̈⃝➥ *\`『 الوقت 』\`*
  ${secondString(yt_play[0].duration.seconds)}
─━━━━┉❈⏤͟͟͞͞★꙲⃝͟
◡̈⃝➥ *\`『 المشهدات 』\`*
  ${MilesNumber(yt_play[0].views)}
─━━━━┉❈⏤͟͟͞͞★꙲⃝͟
◡̈⃝➥ *\`『 الرابط 』\`*
𖤍 ${yt_play[0].url}
*✧══════•𝑺𝐴𝐹𝑅O𝑇-𝐵O𝑇•══════✧*`.trim();

    const buttons = [
      ['(الصوت)', `${usedPrefix}yta ${yt_play[0].url}`],
    ];

    await conn.sendButton(m.chat, wm, texto1, yt_play[0].thumbnail, buttons, null, null, m);
  } catch (e) {
    await conn.reply(m.chat, `حدث خطأ، يرجى المحاولة لاحقاً. #report الخطأ: ${usedPrefix + command}\n\n${wm}`, estilo2, m);
    console.log(`❗❗ الخطأ: ${usedPrefix + command} ❗❗`);
    console.log(e);
  }
};

handler.command = ['شغل'];
export default handler;

async function search(query, options = {}) {
  const search = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
  return search.videos;
}

function MilesNumber(number) {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const rep = '$1.';
  const arr = number.toString().split('.');
  arr[0] = arr[0].replace(exp, rep);
  return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? d + (d == 1 ? ' يوم, ' : ' أيام, ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? ' ساعة, ' : ' ساعات, ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' دقيقة, ' : ' دقائق, ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' ثانية' : ' ثواني') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

// الدالة الخاصة بتنزيل الصوت
async function downloadAudio(url, m, conn) {
  try {
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
    if (!format) throw new Error('لم أتمكن من الحصول على صيغة الصوت المطلوبة.');

    const audio = await ytdl(url, { format });
    const title = info.videoDetails.title;

    await conn.sendFile(m.chat, audio, `${title}.mp3`, ``, m);
  } catch (e) {
    console.log(`خطأ أثناء تنزيل الصوت: ${e.message}`);
    await conn.reply(m.chat, `حدث خطأ أثناء تنزيل الصوت. حاول مرة أخرى.`, estilo2, m);
  }
    }
