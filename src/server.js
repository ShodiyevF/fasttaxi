const telegramBot = require('node-telegram-bot-api')
const { v4: uuidv4 } = require('uuid');
const { uniqRow } = require('./lib/pg')

const bot = new telegramBot('5053155270:AAGkjgcCFjyI-BY9Fp0vp5-3G-mlLxyg1hw', {
    polling: true
})

bot.onText(/\/start/, async (msg) => {
    try {
        const id = msg.chat.id

        const orders = await uniqRow('select * from elontaxi where taxi_owner = $1', id)
        if (orders.rows.length) {
            await bot.sendMessage(id, 'Buyurtmalar bekor qilindi !')
            await uniqRow('delete from elontaxi where taxi_owner = $1', id)
        }
        
        
        await bot.sendMessage(id, 'TEXT', {
            reply_markup: {
                resize_keyboard: true,
                keyboard: [
                    ['Elon Taxi 🚖']
                ]
            }
        })
    } catch (error) {
        console.log(error.message, 'start');
    }
})

// bot.onText(/\Elon Taxi 🚖/, async (msg) => {
//     try {
//         const id = msg.chat.id
//         await bot.sendMessage(id, 'boradigan manzilingizni kiriting', {
//             reply_markup: {
//                 remove_keyboard: true
//             }
//         })
//         const step = (await uniqRow('select * from steps where step_user = $1 and step_status = 1', id)).rows
//         if (step.length) {
//             await uniqRow('delete from steps where step_user = $1 and step_status = 1', id)
//         } else {
//             await uniqRow(`insert into steps (step_status, step_step, step_user) values (1, 1, $1)`, id)
//             bot.on('message', async msg => {

//             })
//         }
//     } catch (error) {
//         console.log(error.message, 'Elon Taxi 🚖');
//     }
// })

bot.onText(/\Elon Taxi 🚖/, async msg => {
    const id = msg.chat.id
    try {
        await bot.sendMessage(id, 'Boradigan manzilingizni kiriting', {
            reply_markup: {
                remove_keyboard: true
            }
        })
        bot.on('message', async msg => {
            const id2 = msg.chat.id
            if (id === id2) {
                
                const uniqueID = uuidv4().split('-')[0]
                
                await uniqRow('insert into elontaxi (taxi_unique_id, taxi_now, taxi_owner) values ($1,$2,$3)', uniqueID, msg.text, id)
                await bot.sendMessage(id, 'Siz turgan manzilni kiriting')
                bot.on('message', async msg => {
                    const id3 = msg.chat.id
                    if (id2 === id3) {
                        await uniqRow('update elontaxi set taxi_then = $1 where taxi_owner = $2', msg.text, id3)
                        bot.sendMessage(id3, 'Odam sonini kiriting')
                        bot.on('message', async msg => {
                            
                        })
                        bot.removeListener('message')
                    }
                })
                bot.removeListener('message')
            }
        })
    } catch (error) {
        
    }
})

// bot.on('message', async (msg) => {
//     const id = msg.chat.id

//     if (msg.text === 'Elon Taxi 🚖') {
//         await bot.sendMessage(id, 'boradigan manzilingizni kiriting', {
//             reply_markup: {
//                 remove_keyboard: true
//             }
//         })
        
//         bot.on('message', async msg => {
//             await uniqRow('insert into elontaxi (taxi_now, taxi_owner) values ($1,$2)', msg.text, id)
//         })

//     }
    
// })

// bot.on('message', async msg => {
//     const id = msg.chat.id

//     await uniqRow('insert into elontaxi (taxi_now) values ($1)', id)

//     const taxi = await uniqRow('select * from elontaxi where taxi_owner = $1', id)

//     if (taxi.rows[0].taxi_status === 1) {
//         await uniqRow('insert into elontaxi (taxi_now, taxi_owner) values ($1,$2)', msg.text, id)
//         await bot.sendMessage(id, )
//     }

// })


// https://receivesmsfast.com/messages?n=447360538792