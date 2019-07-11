const express = require('express')
const moment = require('moment-timezone');


const app = express()
const mongodbConnection = require('./mongodb.connection')
const User = require('./user.model')
mongodbConnection
    .then(() => {
        console.log('Conexión a DB exitosa');
    })
    .catch(error => console.log('Error en la conexión', error))
app.use(express.json())

app.listen(4000, () => console.log('Server on port 4000'))

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const user = new User({ email, password })
    const userResponse = await user.save()
    res.json(userResponse)
})
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (user) {
        const more20Seconds = isDiffMoreOrEqualToZero(user.lockUntil)
        if (more20Seconds) {
            if (user.password == password) {
                user.attempts = 0
                await user.save()
                res.json(user)
            } else {
                if (!user.attemptDate) {
                    user.attemptDate = moment().toISOString()
                }

                const momentAttemptDate = moment(user.attemptDate);
                const now = moment();
                const diff = now.diff(momentAttemptDate, 'seconds');
                console.log(JSON.stringify({ momentAttemptDate: momentAttemptDate.format('hh:mm:ss'), now: now.format('hh:mm:ss'), momentAttemptDate: momentAttemptDate.format('hh:mm:ss'), diff }, null, 4));
                const _more20Seconds = moment.duration(now.diff(momentAttemptDate)).asSeconds() > 10;
                console.log('_more20Seconds', _more20Seconds);

                if (_more20Seconds) {
                    user.attemptDate = moment().toISOString()
                    user.attempts = 0
                    await user.save()
                    return res.json({ message: "Clave incorrecta", })
                } else {
                    if (user.attempts >= 2) {
                        user.attempts = 0;
                        user.lockUntil = moment().add(10, 'seconds').toISOString()
                        await user.save()
                        return res.json({ message: "Por cuestiones de Seguridad bloqueamos tu cuenta intenta dentro de 30 segundos", })

                    } else {
                        user.attempts = user.attempts + 1;
                        await user.save()
                        return res.json({ message: "Clave incorrectas", intentos: user.attempts })

                    }
                }


            }


        } else {
            const tz = "America/Bogota"
            res.json({ message: `else Tu Cuenta esta bloqueada Hasta ${moment(user.lockUntil).tz(tz).format('hh:mm:ss')}` })
        }




    } else {
        res.json({ message: 'el usuario no exite' })
    }
})

function isDiffMoreOrEqualToZero(date) {
    const now = moment(new Date()); //todays date
    const end = moment(date); // another date
    const duration = moment.duration(now.diff(end));
    const seconds = duration.asSeconds();
    console.log('date', date);
    console.log('Seconds', seconds);
    return seconds >= 0
}
