FROM python:3.8

RUN pip install pipenv

COPY . ./

RUN pipenv --python /usr/local/bin/python3.8 && \
    pipenv lock && \
    pipenv requirements > requirements.txt && \
    pip install -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
