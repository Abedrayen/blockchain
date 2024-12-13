#! /bin/bash
echo "[INFO] Preparing Backend infrastructure ................"
cd backend/
cat .env.example >> .env
npm i
docker-compose up --build -d
npm run swagger:ts
echo "[INFO] Preparing Backend infrastructure done."

echo \n\n\n

echo "[INFO] Preparing iA infrastructure ................"
cd ../iA-blockchain
pip install -r requirements.txt
docker-compose up --build -d
echo "[INFO] Preparing iA infrastructure done."

echo \n\n\n

echo "[INFO] Preparing Mobile App infrastructure ................"
cp -f backend/src/api/myApi.ts mobile-app/src/api/myApi.ts
cd ../mobile-app
cat .env.example >> .env
echo -e EXPO_PUBLIC_API_URL=$(gp url 3000) >> .env
npm i
npx expo start --tunnel -c