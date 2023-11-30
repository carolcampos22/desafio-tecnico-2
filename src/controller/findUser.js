import { db } from "../database/knex.js";
import jwt from 'jsonwebtoken';

const FindUser = async (req, res) => {
    try {
        const token = req.headers.authorization;

        // Verificar se o token é válido
        jwt.verify(token, process.env.JWT_KEY, async (err, decodedData) => {
            if (err) {
                return res.status(401).json({ mensagem: 'Não autorizado' });
            }

            // Buscar informações do usuário no banco de dados usando o ID do token
            const user = await db('users').where({ id: decodedData.userId }).first();

            if (!user) {
                return res.status(404).json({ mensagem: 'Usuário não encontrado' });
            }


            res.status(200).json({
                id: user.id,
                nome: user.nome,
                email: user.email,
                telefone: {
                    numero: user.telefone_numero,
                    ddd: user.telefone_ddd,
                },
                data_criacao: user.data_criacao,
                data_atualizacao: user.data_atualizacao,
                ultimo_login: user.ultimo_login,
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

export default FindUser;
