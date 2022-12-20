FROM python:3.8-alpine3.13

EXPOSE 5000

WORKDIR /code

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

CMD [ "python", "app.py" ]


