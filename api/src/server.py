from sanic import Sanic
from sanic.response import text
from sanic.log import logger
from sanic_motor.motor import BaseModel
from sanic_jwt import initialize

from handlers.assets import AssetsView, AssetsWithDidView
from handlers.compute import ComputesView
from handlers.users import UsersView

from handlers.authentication import authenticate, retrieve_user

from adapters.ocean import OceanAdapter
from db.users import UserDao
from db.assets import AssetDao
from db.computes import ComputeDao

app = Sanic("C2DFlow")
initialize(app, authenticate=authenticate, retrieve_user=retrieve_user, url_prefix='/authentications')

app.update_config("./config/config.py")
BaseModel.init_app(app)

app.ctx.ocean = OceanAdapter()
app.ctx.users_dao = UserDao()
app.ctx.assets_dao = AssetDao()
app.ctx.computes_dao = ComputeDao()

app.add_route(AssetsView.as_view(), "/assets")
app.add_route(AssetsWithDidView.as_view(), "/assets/<did>")
app.add_route(ComputesView.as_view(), "/computes")
app.add_route(UsersView.as_view(), "/users")

app.run(host='0.0.0.0', port=8000, debug=True, access_log=True)
