FROM python:3.8.3-alpine


RUN apk add --no-cache build-base

RUN python -m pip install --upgrade pip

COPY requirements.txt requirements.txt
RUN python -m pip install -r requirements.txt

COPY . .

EXPOSE 8006

CMD ["python", "manage.py", "runserver", "0.0.0.0:8006"]
