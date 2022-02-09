from asyncio.log import logger
from sanic_motor.motor import BaseModel
from bson import ObjectId

types = ['data', 'alg']

class Asset(BaseModel):
    __coll__ = "assets"
    __unique_fields__ = ['did']


class AssetDao:

    def __init__(self):
        return
    
    async def insert_asset(self, did, publisher, type): 

        asset = {
            "_id": str(ObjectId()),
            "did": did,
            "type": type,
            "publisher": publisher,
            "buyers": []
        }

        asset["algorithms"] = [] if type == "data" else None

        new_asset = await Asset.insert_one(asset)

        return new_asset.inserted_id

    async def add_trusted_algorithm_to_asset(self, did, alg):      

        updated_asset = await Asset.update_one({"did": did}, { "$push": { "algorithms": alg } })

        return updated_asset

    async def add_buyer_to_asset(self, did, buyer):      

        updated_asset = await Asset.update_one({"did": did}, { "$push": { "buyers": buyer } })

        return updated_asset

    async def get_asset_by_did(self, did):

        asset = await Asset.find_one(
            {"did": did}, as_raw=True
        )

        return asset

    async def get_data_assets(self):

        cursor = await Asset.find({"type": "data"}, as_raw=True)    
        return cursor.objects

    async def get_algorithm_assets(self):

        cursor = await Asset.find(
            {"type": "alg"}, as_raw=True
        )

        return cursor.objects
