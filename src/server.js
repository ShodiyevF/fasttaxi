const telegramBot = require('node-telegram-bot-api')
const { uniqRow } = require('./lib/pg')

const bot = new telegramBot('5053155270:AAGkjgcCFjyI-BY9Fp0vp5-3G-mlLxyg1hw', {
    polling: true
})

bot.onText(/\/start/, async (msg) => {
    try {
        const id = msg.chat.id
        await bot.sendMessage(id, 'TEXT', {
            reply_markup: {
                resize_keyboard: true,
                keyboard: [
                    ['Elon Taxi 🚖']
                ]
            }
        })
    } catch (error) {
        console.log(error.message, 'Elon Taxi 🚖');
    }
})

bot.onText(/\Elon Taxi 🚖/, async (msg) => {
    try {
        const id = msg.chat.id
        await bot.sendMessage(id, 'boradigan manzilingizni kiriting', {
            reply_markup: {
                remove_keyboard: true
            }
        })
        const step = (await uniqRow('select * from step where step_user_telegram_id = $1 and step_status = 1 and step_step = 1', id)).rows
        if (step.length) {
            await uniqRow('delete from step where step_user_telegram_id = $1 and step_status = 1', id)
        } else {
            const createStep = await uniqRow(`insert into step (step_status, step_step, step_user_telegram_id) values (1, 1, $1)`, id)
            bot.on('message', async msg => {
                
            })
        }
    } catch (error) {
        console.log(error.message, 'Elon Taxi 🚖');
    }
})

bot.on('message', async (msg) => {
    const id = msg.chat.id
    
})