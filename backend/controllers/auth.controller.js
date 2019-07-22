const User = require('../models/user.model');
const moment = require('moment-timezone');
const max_login_attempt = 4;
const lock_duration_secs = 60 * 2;
module.exports = { Register, Login }
async function Register(req, res) {
    try {
        const { email, password } = req.body;
        const user = new User({ email, password })
        const userResponse = await user.save()
        res.json({ success: true, user: userResponse })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
async function Login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) { // User found 
        const more20Seconds = isDiffMoreOrEqualToZero(user.lockUntil)
        if (more20Seconds) {
            if (user.password == password) { // Validate password XD
                user.attempts = 0
                await user.save()
                res.json({ success: true, user,lock: false })
            } else {
                if (!user.attemptDate) {
                    user.attemptDate = moment().toISOString()
                }
                const momentAttemptDate = moment(user.attemptDate);
                const now = moment();
                const _more20Seconds = moment.duration(now.diff(momentAttemptDate)).asSeconds() > 10;
                if (_more20Seconds) {
                    user.attemptDate = moment().toISOString()
                    user.attempts = 0
                    await user.save()
                    return res.json({ message: "Clave incorrecta", lock: false})
                } else {
                    if (user.attempts >= max_login_attempt) {
                        user.attempts = 0;
                        user.lockUntil = moment().add(lock_duration_secs, 'seconds').toISOString()
                        await user.save()
                        return res.json({ success: false, lock: true, message: `Por cuestiones de Seguridad bloqueamos tu cuenta intenta dentro de ${lock_duration_secs} segundos`, })
                    } else {
                        user.attempts = user.attempts + 1;
                        await user.save()
                        return res.json({ message: "Clave incorrecta", intentos: user.attempts })
                    }
                }
            }
        } else {
            const tz = "America/Bogota"
            res.json({ success: false, lock: true, message: `Tu cuenta esta bloqueada hasta ${moment(user.lockUntil).tz(tz).format('hh:mm:ss')}` })
        }
    } else {
        res.json({ success: false, message: 'el usuario no existe' })
    }
}

function isDiffMoreOrEqualToZero(date) {
    const now = moment(new Date());
    const end = moment(date);
    const duration = moment.duration(now.diff(end));
    const seconds = duration.asSeconds();
    return seconds >= 0
}