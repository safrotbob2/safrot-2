import { execSync } from 'child_process';

let handler = async (m, { conn, text }) => {
  try {
    if (global.conn.user.jid == conn.user.jid) {
      let stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''));
      conn.reply(m.chat, stdout.toString(), m);
    }
    // } catch {
    var update = execSync('git remote set-url origin https://github.com/Wilsmac/NatsukiBot.git && git pull');
    await m.reply(update.toString());
  } catch {
    await m.reply(`في مشكلة في التحديث`);
  }
};

handler.help = ['اسكربتي'];
handler.tags = ['مالك'];
handler.command = /^اسكربتي|actualizar$/i;
handler.rowner = true;

export default handler;
