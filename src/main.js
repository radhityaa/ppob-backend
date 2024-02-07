import 'dotenv/config.js'
import { web } from './app/web.js'
import { logger } from './app/logging.js'
import User from './models/UserModel.js'
import BlacklistedToken from './models/BlacklistedToken.js'
import Otp from './models/OtpModel.js'
import Token from './models/TokenModel.js'
import Digiflazz from './models/DigiflazzModel.js'
import Category from './models/CategoryModel.js'
import Setting from './models/SettingModel.js'

const PORT = process.env.PORT
const BASE_URL = process.env.BASE_URL

// await User.sync({ force: true })
//     .then(async function () {
//         await User.create({
//             name: 'Rama Adhitya Setiadi',
//             username: 'radhitya',
//             password: '$2a$12$LuC/7SBxa8rSIIqCfrdRh.mkLfhBurXPzGUNrmaHdSnWK5JhPzYn.', // password
//             pin: '$2a$12$AVVtnOaXL14UZQVCPMccW.76/A6fu29z3djWeMSZ/aU3qFZnLb/i6', // 123456
//             email: 'ramaadhityasetiadi002@gmail.com',
//             phone: '0895347113987',
//             saldo: 10000000,
//             isAdmin: true,
//             isVerif: true
//         })
//     })
// await BlacklistedToken.sync({ force: true })
// await Otp.sync({ force: true })
// await Token.sync({ force: true })
// await Digiflazz.sync({ force: true })
// await Category.sync({ force: true })
// await Setting.sync({ force: true })
//     .then(async function () {
//         await Setting.create({
//             name: 'tripay',
//             desc: 'd1 = api key, d2 = private key, d3 = merchant code',
//             d1: 'DEV-plhjaXjRpSCVh1x2XioZ1idekIuJJGp6tpw9Z9TI',
//             d2: 'ut9la-wyTZI-IbQaa-EidVR-TQxI5',
//             d3: 'T19336'
//         })
//         await Setting.create({
//             name: 'digiflazz',
//             desc: 'd1 = username, d2 = key, d3 = secret webhook',
//             d1: 'binoyuD86ZRg',
//             d2: '4ad82c87-15a8-5b14-a53c-174340fc3eaa',
//             d3: 'knmasdjb21786312knmadaw554dwadm8h231jn2312alishd78whake'
//         })
//     })

web.listen(PORT, () => {
    logger.info(`Server runnning on ${BASE_URL}`)
})