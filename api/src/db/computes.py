from sanic_motor.motor import BaseModel
from bson import ObjectId

class Compute(BaseModel):
    __coll__ = "computes"
    __unique_fields__ = ['job_id']


class ComputeDao:

    def __init__(self):
        return
    
    async def insert_compute(self, did, job_id, ordered):

        compute = {
            "_id": str(ObjectId()),
            "did": did,
            "job_id": job_id,
            "ordered": ordered
        }

        new_compute = await Compute.insert_one(compute)

        return new_compute.inserted_id
    
    async def get_compute_by_job_id(self, job_id):
        compute = await Compute.find_one(
            {"job_id": job_id}, as_raw=True
        )

        return compute