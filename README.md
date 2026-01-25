# ConUHacks-X

# Before the Click
An Interactive Murder Mystery game. 

## Members and Role
- Yemisi Kelsea 
- Sukhdarshan Singh 
- Rime Mokhtari 
- Moumy Ndiaye

## How We Built It
- Frontend: React
- Backend: Flask
- AI / APIs: Gemini API
- Database: MongoDB


## Flask backend

### Setup
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
# source venv/bin/activate

pip install -r requirements.txt
copy .env  # Windows PowerShell: Copy-Item .env.example .env

#run app
python wsgi.py

#Run app locally 
#back end
python -m flask run

#front end
npm run dev

#deploy Render
https://conuhacks-x.onrender.com/