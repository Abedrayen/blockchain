FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .

RUN apt-get update && apt-get install -y gcc

RUN pip install --upgrade pip

RUN pip install --upgrade wheel

RUN pip install -r requirements.txt

COPY . .

CMD [ "flask", "run","--host","0.0.0.0","--port","5000", "--reload"]