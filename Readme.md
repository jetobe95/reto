# Bloqueo de usuario por número de intentos fallidos 
 - Bloqueo de usuario después de 3 intentos fallidos en 10 segundos.
- Reactivación del usuario después de 10 segundos.


## Get Started
 - Run  `npm install`
 - Run`npm start`
## Routes
 - POST /login { email, password }
 - POST /register { email, password }

## Mongoose Schemas

###  User
| Property  | Type |
| ------------- | ------------- |
| email  | String  |
| password  | String  |
| lockUntil  | Date  |
| attempts  | Number  |
| attemptDate  | Date  |



