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
import Deposit from './models/DepositModel.js'
import Activity from './models/ActivityModel.js'
import Mutasi from './models/MutasiModel.js'

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
// await Digifl azz.sync({ force: true })
// await Category.sync({ force: true })
// await Setting.sync({ force: true })
//     .then(async function () {
//         await Setting.create({
//             name: 'tripay',
//             desc: 'd1 = api key, d2 = private key, d3 = merchant code',
//             d1: 'DEV-1TnkVMJheFh0QQl5IpGzo9EZ3RSnYPymCIm614FJ',
//             d2: 'pT37T-VbaCy-tPZqp-JhojK-LDLnS',
//             d3: 'T29295'
//         })
//         await Setting.create({
//             name: 'digiflazz',
//             desc: 'd1 = username, d2 = key, d3 = secret webhook',
//             d1: 'binoyuD86ZRg',
//             d2: '4ad82c87-15a8-5b14-a53c-174340fc3eaa',
//             d3: 'knmasdjb21786312knmadaw554dwadm8h231jn2312alishd78whake'
//         })
//     })
// await Deposit.sync({ force: true })
// await Activity.sync({ force: true })
// await Mutasi.sync({ force: true })

web.listen(PORT, () => {
    logger.info(`Server runnning on ${BASE_URL}`)
})