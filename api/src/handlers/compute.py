from sanic import Sanic
from sanic.views import HTTPMethodView
from sanic.response import json, text
from sanic.log import logger
import json as jsonlib

from sanic_jwt import protected, inject_user

class ComputesView(HTTPMethodView):

    decorators = [protected(), inject_user()]

    async def post(self, request, user):
        app = Sanic.get_app("C2DFlow")

        private_key = user["private_key"]

        body = request.json      

        data_did = body['data_did']
        alg_did = body['alg_did']      

        job_id = app.ctx.ocean.compute(private_key, data_did, alg_did)
        await app.ctx.computes_dao.insert_compute(data_did, job_id, user['_id'])

        return json({"job_id": job_id}, status=201)
    
    async def get(self, request, user):
        app = Sanic.get_app("C2DFlow")
        
        private_key = user["private_key"]

        job_id = request.args.get("job_id")

        compute = await app.ctx.computes_dao.get_compute_by_job_id(job_id)

        result = app.ctx.ocean.job_status(private_key, compute['did'], job_id)

        return json({"result": jsonlib.dumps(result)}, status=200)
    