import uploadImage from '../lib/uploadImage.js';
import { sticker } from '../lib/sticker.js';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    let q = m.quoted ? m.quoted : m; // لو في رد على رسالة، استخدم الرسالة المقتبسة، وإلا استخدم الرسالة الحالية
    let mime = (q.msg || q).mimetype || ''; // احصل على نوع MIME للصورة
    let img = await q.download(); // حمّل الصورة
    let url = await uploadImage(img); // ارفع الصورة واحصل على رابطها
    let scircle = global.API('dzx', '/api/canvas/circle', { url }); // استخدم API لإنشاء صورة ملصق دائري
    let stiker = await sticker(null, scircle, global.packname, global.author); // أنشئ الملصق
    
    conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, { asSticker: true }); // أرسل الملصق إلى الدردشة
  } catch (e) {
    // إذا حدث خطأ، أرسل رسالة للمستخدم
    m.reply('*\`『 اعمل ريب علي صوره معا الامر 』\`*');
  }
};

handler.command = /^دائري|circle|círculo|circulo|scírculo|scirculo|sircle|redondo|circular$/i; // الأمر الذي يفعّل هذا الكود

export default handler;
