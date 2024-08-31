let handler = async (m, { conn, text, command, usedPrefix }) => {
    if (!text) throw '*\`『 منشن للي عايز تفك الحظر عنو🐦‍⬛ 』\`*';
    let who;
    if (m.isGroup) who = m.mentionedJid[0];
    else who = m.chat;
    if (!who) throw '*\`『 اعمل منشن للي عايز تشيل الحظر عنو🐦 』\`*';
    let users = global.db.data.users;
    users[who].banned = false;
    conn.reply(m.chat, `تم فك الحظر🐦`, m);
}
handler.help = ['فك-الحظر'];
handler.tags = ['owner'];
handler.command = /^فك_الحظر|فك-الحظر$/i;
handler.group = true;
handler.admin = true;
export default handler;
