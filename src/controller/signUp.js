import {db} from "../database/knex.js"
import { v4 } from 'uuid'; 
import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const SignUp = async (req, res) => {
    try {
        const { nome, email, senha, telefones } = req.body;
        const userId = v4();
        const token = jwt.sign({ userId, email }, process.env.JWT_KEY, { expiresIn: '30m' });

        // Criptografia hash na senha
        const hashedPassword = bcrypt.hashSync(senha, 10);

        // Verificação de e-mail já cadastrado
        const emailExists = await db("users").select().where({ email });

        if (emailExists.length > 0) {
            return res.status(400).json({ mensagem: "E-mail já existente" });
        }

        
        const currentTime = new Date().toISOString();

        // Inserir novo usuário no banco de dados
        const newUser = {
            id: userId,
            nome,
            email,
            senha: hashedPassword,
            telefone_numero: telefones[0].numero,
            telefone_ddd: telefones[0].ddd,
            data_criacao: currentTime,
            data_atualizacao: currentTime,
            ultimo_login: currentTime,
        }

        await db("users").insert(newUser)

        res.status(200).json({
            id: userId,
            data_criacao: currentTime,
            data_atualizacao: currentTime,
            ultimo_login: currentTime,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}


export default SignUp;