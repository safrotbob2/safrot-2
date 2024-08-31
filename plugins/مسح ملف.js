import { tmpdir } from 'os'
import path from 'path'
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch
} from 'fs'

let handler = async (m, { conn, usedPrefix: _p, __dirname, args, text }) => {
    if (!text) return conn.reply(m.chat, `اكتب اسم ومسار الملف اللي عايز تمسحه.`, m, canalofc)

    const file = text.trim()
    if (!existsSync(file)) return conn.reply(m.chat, `الملف مش موجود...`, m, canalofc)

    unlinkSync(file)
    conn.reply(m.chat, `الملف \`${file}\` تم مسحه بنجاح.`, m, canalofc)
}
handler.tags = ['owner']
handler.help = ['مسح_ملف']
handler.command = /^(مسح_ملف|df)$/i
handler.rowner = true

export default handler
