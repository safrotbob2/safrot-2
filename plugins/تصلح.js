import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs';
import path from 'path';

const handler = async (m, { conn, usedPrefix }) => {
  if (global.conn.user.jid !== conn.user.jid) {
    return conn.sendMessage(m.chat, {text: '*[✨] استخدم الأمر ده مباشرةً من الرقم الرئيسي للبوت*'}, {quoted: m});
  }
  const chatId = m.isGroup ? [m.chat, m.sender] : [m.sender];
  const sessionPath = './NatsukiSessions/';
  try {
    const files = await fs.readdir(sessionPath);
    let filesDeleted = 0;
    for (const file of files) {
      for (const id of chatId) {
        if (file.includes(id.split('@')[0])) {
          await fs.unlink(path.join(sessionPath, file));
          filesDeleted++;
          break;
        }
      }
    }
    if (filesDeleted === 0) {
      await conn.sendMessage(m.chat, {text: '*[✨] مفيش أي ملف تم العثور عليه بيشمل ID الشات*'}, {quoted: m});
    } else {
      await conn.sendMessage(m.chat, {text: `*¸.☆¸.♡.¸*\n*تم حذف ${filesDeleted} ملفات جلسة*`}, {quoted: m});
    }
  } catch (err) {
    console.error('حصل خطأ أثناء قراءة أو حذف ملفات الجلسة:', err);
    await conn.sendMessage(m.chat, {text: '*[🧚🏻‍♂️] حصل خطأ أثناء حذف ملفات الجلسة*'}, {quoted: m});
  }
  await conn.sendMessage(m.chat, {text: `*مرحبًا! دلوقتي تقدر تشوف رسائلي؟*\n\n*¸.☆¸.♡.¸ ~_لو البوت مش بيرد على أوامرك اعمل شوية سبام صغير_~*\n\n*⇴ مثال:*\n${usedPrefix}s\n${usedPrefix}s\n${usedPrefix}s`}, {quoted: m});
};
handler.help = ['fixmsgespera'];
handler.tags = ['fix'];
handler.command = /^(fixmsgespera|تصليح|ds)$/i;
export default handler;
