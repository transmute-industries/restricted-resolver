# Restricted Resolver

[![Docker Hub](https://github.com/transmute-industries/restricted-resolver/actions/workflows/cd.yml/badge.svg)](https://github.com/transmute-industries/restricted-resolver/actions/workflows/cd.yml)

Like the universal resolver, but with some restrictions.

- No blockchain DID Methods.
- No JSON-LD Processing, however, valid JSON-LD is returned.
- Ignores accept header.
- Only returns `application/json`.
- `did:key` support for `secp256r1`, `secp348r1`, `secp256k1`, `ed25519`, `x25519`
- `did:web` support for `.well-known` and `path based` DIDs.

## Docker

```
docker pull transmute/restricted-resolver
docker run -d -p 8080:8080 transmute/restricted-resolver
curl -sX GET http://localhost:8080/1.0/identifiers/did:web:did.actor:supply-chain:manufacturer:carlos
curl -sX GET http://localhost:8080/1.0/identifiers/did:key:z6MkevkjV3woJLJ1p6tSvx9PUTyn7e8cSm9Wy5VjkWUo4WLK
curl -sX GET http://localhost:8080/1.0/identifiers/did:key:zDnaefnQrwjZPFASgQoQoTfrcG65gxHK4qNappjxnv6aiATQt
curl -sX GET http://localhost:8080/1.0/identifiers/did:key:zQ3shk7C2uqYB7jgmCiCxA8DusuMKwc1wjJAHS17pmQvr48Q9
docker stop $(docker ps -q --filter ancestor=transmute/restricted-resolver )
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
