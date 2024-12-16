import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chat from 'App/Models/Chat';
import ChatValidator from 'App/Validators/ChatValidator';
import axios from 'axios';
import Env from '@ioc:Adonis/Core/Env';

export default class ChatsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theChat: Chat = await Chat.findOrFail(params.id)
            // Cargar los mensajes load
            await theChat.load('messages');
            console.log(theChat.messages);
            return theChat;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Chat.query().paginate(page, perPage)
            } else {
                return await Chat.query()
            }
        }
    }

    public async findByUser({ params }: HttpContextContract) {
        // Busca los chats donde el usuario sea el que se pasa por parámetro o el emailTo sea el que se pasa por parámetro
        return await Chat.query().where('userId', params.id).orWhere('emailTo', params.emailTo).preload('messages');
    }


    public async create({ request, response }: HttpContextContract) {
        await request.validate(ChatValidator);
        const body = request.body();
        const email = body.emailTo;

        const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/email/${email}`, {
            headers: { Authorization: request.headers().authorization || '' }
        });

        if (!userResponse.data || Object.keys(userResponse.data).length === 0) {
            response.status(404);
            return { error: 'No se encontró información de usuario en el microservicio' };
        }

        // Verifica que la dupla emailTo y emailFrom no exista
        let chat = await Chat.query().where('emailTo', body.emailTo).andWhere('emailFrom', body.emailFrom).first();
        chat = await Chat.query().where('emailTo', body.emailFrom).andWhere('emailFrom', body.emailTo).first();
        if (chat) {
            response.status(400);
            return { error: 'Ya existe un chat con este usuario' };
        }

        let payload = {
            userId: body.userId,
            emailTo: body.emailTo,
            emailFrom: body.emailFrom
        };

        const theChat: Chat = await Chat.create(payload);
        return theChat;
    }

    public async update({ params, request }: HttpContextContract) {
        const theChat: Chat = await Chat.findOrFail(params.id);
        const body = request.body();
        theChat.userId = body.userId;
        theChat.emailTo = body.emailTo;
        return await theChat.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theChat: Chat = await Chat.findOrFail(params.id);
        response.status(204);
        return await theChat.delete();
    }
}
