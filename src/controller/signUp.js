import {db} from "../database/knex.js"
import { v4 } from 'uuid'; // Para gerar GUID/ID
import jwt from 'jsonwebtoken'; // Para gerar tokens JWT
import bcrypt from 'bcryptjs'

 const SignUp = async (req, res) => {
    try {
        const { nome, email, senha, telefones } = req.body;
        const userId = v4();
        const token = jwt.sign({ userId, email }, 'chave-secreta-do-jwt', { expiresIn: '1h' });

        // Criptografia hash na senha
        const hashedPassword = bcrypt.hashSync(senha, 10);

        // Inserir novo usuário no banco de dados
        const currentTime = new Date().toISOString();

        // Verificação de e-mail já cadastrado

        const emailExists = async (email) => {
            const user = await db("users").select().where({ email })
        }

        if(emailExists){
            res.send({"mensagem": "E-mail já existente"})
        }

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

        res.status(200).send({
            id: userId,
            data_criacao: currentTime,
            data_atualizacao: currentTime,
            ultimo_login: currentTime,
            token

        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
}

export default SignUp;