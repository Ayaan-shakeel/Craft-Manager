from dotenv import load_dotenv
import os
load_dotenv()
Database_URL=os.getenv("Database_URL")
Secret_key=os.getenv("Secret_key")
Algorithm=os.getenv("Algorithm")
Access_Token_Expire_Minutes=int (os.getenv("Access_Token_Expire_Minutes"))