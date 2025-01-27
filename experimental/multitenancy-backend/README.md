# Darrbak Backend

## Development

### for development, you can use docker compose to run the server [WIP]

```bash
docker compose up
```

### or you can use the following commands to run the server [Recommended]

Setup Database
```bash
touch db.sqlite3
```

add the following to your .env file
```bash
DATABASE_URL_EXTERNAL=sqlite://db.sqlite3
```

install dependencies
```bash
pip install -r requirements.txt
```

to run the server, you need to have the database running and updated with the latest migrations, you can use the following command to run the database

```bash
python manage.py migrate
```

Running the server
```bash
python manage.py runserver
```