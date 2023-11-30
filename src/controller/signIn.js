import {db} from "../database/knex.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const SignIn = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Buscar usuário pelo e-mail no banco de dados
        const user = await db('users').where({ email }).first();

        // Verificar se o usuário existe e se a senha está correta
        if (!user || !bcrypt.compareSync(senha, user.senha)) {
            return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos' });
        }

        // Gerar token JWT
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });

        // Atualizar informações do último login
        const currentTime = new Date().toISOString();
        await db('users').where({ id: user.id }).update({
            ultimo_login: currentTime,
            data_atualizacao: currentTime,
        });

        // Retornar informações do usuário e o token
        res.status(200).json({
            id: user.id,
            data_criacao: user.data_criacao,
            data_atualizacao: currentTime,
            ultimo_login: currentTime,
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};


export default SignIn;