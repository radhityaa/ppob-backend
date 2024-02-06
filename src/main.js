import 'dotenv/config.js'
import { web } from './app/web.js'
import { logger } from './app/logging.js'
import User from './models/UserModel.js'
import BlacklistedToken from './models/BlacklistedToken.js'
import Otp from './models/OtpModel.js'
import Token from './models/TokenModel.js'

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

web.listen(PORT, () => {
    logger.info(`Server runnning on ${BASE_URL}`)
})