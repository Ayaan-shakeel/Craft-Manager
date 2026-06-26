from passlib.context import CryptContext
from config import Secret_key,Algorithm,Access_Token_Expire_Minutes
from jose import jwt,JWTError
from datetime import datetime,timedelta
pwd_context=CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)
def hash_password(password : str):
    return pwd_context.hash(password)
def verify_password(plain_password,hashed_password):
    return pwd_context.verify(plain_password,hashed_password)

def create_access_token(data:dict):

      to_encode=data.copy()
      expire=datetime.utcnow() + timedelta(minutes=Access_Token_Expire_Minutes)
      to_encode.update({"exp":expire})
      encoded_jwt=jwt.encode(to_encode,Secret_key,algorithm=Algorithm)
      return encoded_jwt
def verify_token(token:str):
     try:
          payload=jwt.decode(token,Secret_key,algorithms=[Algorithm])
          email=payload.get("sub")
          if email is None:
               return None
          return email
     except JWTError:
          return None