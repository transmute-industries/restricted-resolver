# Restricted Resolver

Like the universal resolver, but with some restrictions.

- No blockchain DID Methods.
- No JSON-LD Processing, however, valid JSON-LD is returned.
- Ignores accept header.
- Only returns `application/json`.

## Docker

```

```

## Development

```
nvm use 18
npm i
npm run start
```

Visit:

```
http://localhost:8080/1.0/identifiers/did:key:z6MkevkjV3woJLJ1p6tSvx9PUTyn7e8cSm9Wy5VjkWUo4WLK
http://localhost:8080/1.0/identifiers/did:web:did.actor:supply-chain:manufacturer:carlos
```

### Docker

```
docker build -f ./Dockerfile . -t restricted-resolver
docker run -d -p 8080:8080 restricted-resolver
docker stop $(docker ps -q --filter ancestor=restricted-resolver )
```
