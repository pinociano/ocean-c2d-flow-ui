from sanic_motor.motor import BaseModel
from bson import ObjectId

class User(BaseModel):
    __coll__ = "users"
    __unique_fields__ = ['username']


class UserDao:

    def __init__(self):
        return
    
    async def insert_user(self, user):
        user["_id"] = str(ObjectId())

        new_user = await User.insert_one(user)

        return new_user.inserted_id
    
    async def get_user_by_id(self, user_id):
        user = await User.find_one(
            {"_id": user_id}, as_raw=True
        )

        return user
    
    async def get_user(self, username, password):
        user = await User.find_one(
            {"username": username, "password": password}, as_raw=True
        )

        return user

