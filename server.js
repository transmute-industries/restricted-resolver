const http = require("http");

const didKey = require("@transmute/did-key.js");
const didWeb = require("@transmute/did-web");

const didJwk = require('@or13/did-jwk')

const endpointPathPrefix = "/1.0/identifiers/";

const didDocumentToDidResolutionResponseObject = (didDocument) => {
  return {
    "@context": "https://w3id.org/did-resolution/v1",
    didDocument: didDocument,
    didResolutionMetadata: {
      contentType: "application/json",
      pattern: "^did:(?web:|jwk:|key:).+$",
    },
    didDocumentMetadata: {},
  };
};
const requestListener = async function (req, res) {
  if (req.url.startsWith(endpointPathPrefix)) {
    const didUrl = req.url.replace(endpointPathPrefix, "");
    const did = didUrl.split("#")[0];
    let didDocument = null;

    if (did.startsWith("did:jwk")) {
      didDocument = await didJwk.resolve(did);
    }

    if (did.startsWith("did:key")) {
      ({ didDocument } = await didKey.resolve(did, {
        accept: "application/did+json",
      }));
    }

    if (did.startsWith("did:web")) {
      didDocument = await didWeb.resolve(did);
    }

    if (didDocument !== null) {
      const resolutionResponseObject =
        didDocumentToDidResolutionResponseObject(didDocument);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(resolutionResponseObject, null, 2));
    }
  }

  res.writeHead(404);
  res.end("");
};

const server = http.createServer(requestListener);

server.listen(8080);
