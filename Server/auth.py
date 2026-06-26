from passlib.context import CryptContext
from config import Secret_key,Algorithm,Access_Token_Expire_Minutes
from jose import jwt,JWTError
from datetime import datetime,timedelta
from fastapi import Depends,HTTPException
from fastapi.security import OAuth2PasswordBearer
from models import User
from database import sessionLocal
oauth2_scheme=OAuth2PasswordBearer(tokenUrl="/login")
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
     
def get_current_user(token:str=Depends(oauth2_scheme)):
     email=verify_token(token)
     if email is None:
          raise HTTPException(
               status_code=401,
               detail="Invalid token"
          )
     db=sessionLocal()
     user=db.query(User).filter(
          User.email==email
     ).first()
     if user is None:
          raise HTTPException(
               status_code=404,
               detail="User not found"

          )
     return user