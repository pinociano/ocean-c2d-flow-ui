from sanic import Sanic
from sanic.views import HTTPMethodView
from sanic.response import json, text
from sanic.log import logger
import json as jsonlib
from sanic_jwt import protected

class UsersView(HTTPMethodView): 

    async def post(self, request):  
        app = Sanic.get_app("C2DFlow")
        user = request.json

        user_id = await app.ctx.users_dao.insert_user(user)

        return json({"user_id": user_id}, status=201)