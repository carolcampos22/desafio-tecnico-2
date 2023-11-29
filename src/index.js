import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import SignUp from "./controller/signUp.js" 

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(process.env.PORT || 3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.post("/signup", SignUp);

