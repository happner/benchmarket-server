# benchmarket-server

Rudimantary server and ui for storing/browsing test benchmark graphs.

```bash
npm install

cp database.json.example database.json
vi database.json

brew install postgres # and make it run per instructions (manually or as service)
createdb benchmarket_development
# if not defaults already works (eg osx dev workstation) # createuser benchmarket
# if not defaults already works (eg osx dev workstation) # su postgres
# if not defaults already works (eg osx dev workstation) # psql
# if not defaults already works (eg osx dev workstation) # > ALTER ROLE benchmarket WITH PASSWORD 'yourpassword';

node_modules/.bin/db-migrate -e development up
                                # uses corresponding env in database.json

cp .env.example .env
vi .env
bin/server
```
