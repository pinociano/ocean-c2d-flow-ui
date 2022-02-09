from sanic import Sanic
from sanic_jwt import exceptions
from sanic.log import logger

class User:

    def __init__(self, id, username):
        self.user_id = id
        self.username = username

    def __repr__(self):
        return "User(id='{}')".format(self.id)

    def to_dict(self):
        properties = ['user_id', 'username']
        return {prop: getattr(self, prop, None) for prop in properties}

async def authenticate(request, *args, **kwargs):

    app = Sanic.get_app("C2DFlow")

    username = request.json.get("username", None)
    password = request.json.get("password", None)

    if not username or not password:
        raise exceptions.AuthenticationFailed("Missing username or password.")

    user = await app.ctx.users_dao.get_user(username, password)
    if user is None:
        raise exceptions.AuthenticationFailed("Username or password are incorrect")

    return User(user['_id'], user['username'])

async def retrieve_user(request, payload, *args, **kwargs):

    app = Sanic.get_app("C2DFlow")

    if payload:
        user_id = payload.get('user_id', None)
        user = await app.ctx.users_dao.get_user_by_id(user_id)
        return user
    else:
        return None