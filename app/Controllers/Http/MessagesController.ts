import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chat from 'App/Models/Chat';

import Message from "App/Models/Message";
import Ws from 'App/Services/Ws';
import MessageValidator from 'App/Validators/MessageValidator';

export default class MessagesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMessage: Message = await Message.findOrFail(params.id)
            return theMessage;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Message.query().paginate(page, perPage)
            } else {
                return await Message.query()
            }
        }

    }

    public async create({ request }: HttpContextContract) {
        await request.validate(MessageValidator);
        const body = request.body();
        const theMessage: Message = await Message.create(body);
        const chat = await Chat.findOrFail(theMessage.chatId);
        if (chat.emailTo === theMessage.who) {
            Ws.io.emit(chat.emailFrom, chat.emailTo + " te ha enviado un mensaje");
        } else {
            Ws.io.emit(chat.emailTo, chat.emailFrom + " te ha enviado un mensaje");
        }
        return theMessage;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMessage: Message = await Message.findOrFail(params.id);
        const body = request.body();
        theMessage.content = body.content;
        theMessage.who = body.who;
        theMessage.viewed = body.viewed;
        return await theMessage.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMessage: Message = await Message.findOrFail(params.id);
        response.status(204);
        return await theMessage.delete();
    }

    public async viewed({ params }: HttpContextContract) {
        Ws.io.emit(params.id, "Se ha creado un nuevo mensaje");
        return;
    }
}
