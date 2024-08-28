import { sticker } from '../lib/sticker.js'
import axios from 'axios'

// تعريف وظيفة غير متزامنة "handler" تأخذ معلمات
let handler = async (m, {
    conn, // اتصال البوت
    args, // الأوامر أو المدخلات التي يتم إدخالها
    usedPrefix, // البادئة المستخدمة للأمر
    command // الأمر المستخدم
}) => {
let text; // متغير لتخزين النص

    // التحقق من وجود مدخلات في args
    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else throw "*\`『 هات الاسم الي عايز تعمل بي استيكر معا الامر 』\`*";

   // تحقق من وجود نص وتحقق من طوله
   if (!text) return m.reply('وأين النص؟');
   if (text.length > 30) return m.reply('الحد الأقصى 30 كلمة!');

    // الحصول على صورة الملف الشخصي للمستخدم
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/a2ae6cbfa40f6eeea0cf1.jpg');

    // إعداد كائن JSON لإرساله إلى API
    const obj = {
      "type": "quote",
      "format": "png",
      "backgroundColor": "#000000",
      "width": 512,
      "height": 768,
      "scale": 2,
      "messages": [{
         "entities": [],
         "avatar": true,
         "from": {
            "id": 1,
            "name": m.name,
            "photo": {
               "url": pp
            }
         },
         "text": text,
         "replyMessage": {}
      }]
   };

   // إرسال طلب POST إلى API لإنشاء الصورة
   const json = await axios.post('https://bot.lyo.su/quote/generate', obj, {
      headers: {
         'Content-Type': 'application/json'
      }
   });

   // تحويل البيانات المستلمة إلى صيغة buffer
   const buffer = Buffer.from(json.data.result.image, 'base64');

   // إنشاء ملصق من الصورة
   let stiker = await sticker(buffer, false, global.packname, global.author);

   // إرسال الملصق إذا تم إنشاؤه بنجاح
   if (stiker) return conn.sendFile(m.chat, stiker, 'Quotly.webp', '', m);
}

// إعداد المساعدة والعلامات والأمر
handler.help = ['qc'];
handler.tags = ['sticker'];
handler.command = /^(استيكر1)$/i;

export default handler;
