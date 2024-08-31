async function handler(m, { usedPrefix, command }) {
  command = command.toLowerCase();
  this.anonymous = this.anonymous ? this.anonymous : {};

  switch (command) {
    case 'next':
    case 'leave': {
      let room = Object.values(this.anonymous).find(room => room.check(m.sender));
      if (!room) return this.sendMessage(m.chat, { text: `مفيش غرفة مفتوحة ليك دلوقتي.\nابدأ غرفة جديدة عشان تقدر تتكلم.`}, { quoted: m });

      m.reply(`انت طلعت من الشات.`);
      let other = room.other(m.sender);
      if (other) await this.sendMessage(other, { text: `الشخص اللي كنت بتكلمه خرج من الشات.`}, { quoted: m });

      delete this.anonymous[room.id];
      if (command === 'leave') break;
    }
    case 'start': {
      if (Object.values(this.anonymous).find(room => room.check(m.sender))) {
        return this.sendMessage(m.chat, { text: `انت بالفعل في غرفة محادثة. اخرج منها الأول.`}, { quoted: m });
      }

      let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender));
      if (room) {
        await this.sendMessage(room.a, { text: `لقيتلك حد تتكلم معاه.`}, { quoted: m });
        room.b = m.sender;
        room.state = 'CHATTING';
        await this.sendMessage(m.chat, { text: `لقيتلك حد تتكلم معاه.`}, { quoted: m });
      } else {
        let id = +new Date();
        this.anonymous[id] = {
          id,
          a: m.sender,
          b: '',
          state: 'WAITING',
          check: function (who = '') {
            return [this.a, this.b].includes(who);
          },
          other: function (who = '') {
            return who === this.a ? this.b : who === this.b ? this.a : '';
          },
        };
        await this.sendMessage(m.chat, { text: `مافيش حد يتكلم دلوقتي. استنى لحد ما حد يدخل.`}, { quoted: m });
      }
      break;
    }
  }
}

handler.help = ['start', 'leave', 'next'];
handler.tags = ['anonymous'];
handler.command = ['start', 'leave', 'next'];
handler.private = true;
export default handler;
