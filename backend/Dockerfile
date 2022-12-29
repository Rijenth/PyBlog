FROM python:3.8-alpine

EXPOSE 5000

WORKDIR /code

COPY requirements.txt requirements.txt

RUN apk add --no-cache gcc musl-dev linux-headers libffi-dev

RUN pip install -r requirements.txt

COPY . .

CMD [ "python", "app.py" ]
