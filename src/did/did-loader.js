import fs from 'node:fs';

import { config } from '../config/index.js';
import { DIDIon } from './did-ion.js';

let didState;

if (fs.existsSync(config.did.storagePath)) {
  const didStateJson = fs.readFileSync(config.did.storagePath, { encoding: 'utf-8' });
  didState = JSON.parse(didStateJson);
} else {
  if (config.did.method === 'ion') {

const endpoints = [
                'https://dwn-usa-1.ue8cktdq71va0.us-east-2.cs.amazonlightsail.com/', 
                'https://dwn-aggregator.faktj7f1fndve.ap-southeast-2.cs.amazonlightsail.com/',
                'https://dwn-india.vtv94qck5sjvq.ap-south-1.cs.amazonlightsail.com/'
              ];
              
const selectedEndpoint = async () => {
  let fastestEndpoint = '';
  let fastestResponseTime = Number.POSITIVE_INFINITY;
  let responseTimes = [];
  
  // Pick 3 random endpoints
  let randomEndpoints = [];
  while (randomEndpoints.length < 3) {
    let randomIndex = Math.floor(Math.random() * endpoints.length);
    if (!randomEndpoints.includes(endpoints[randomIndex])) {
      randomEndpoints.push(endpoints[randomIndex]);
    }
  }

  console.log(randomEndpoints);
  
  // Check the response time of each endpoint and make sure it returns 200 OK
  for (let endpoint of randomEndpoints) {
    let start = performance.now();
    let response = await fetch(endpoint + "health");
    let end = performance.now();
    if (response.status === 200) {
      responseTimes.push({
        endpoint,
        responseTime: end - start
      });
    }
  }
  
  // Pick the endpoint with the fastest response time
  for (let responseTime of responseTimes) {
    if (responseTime.responseTime < fastestResponseTime) {
      fastestResponseTime = responseTime.responseTime;
      fastestEndpoint = responseTime.endpoint;
    }
  }
  
  return fastestEndpoint;
}

const serviceEndpoint = await selectedEndpoint();




    didState = await DIDIon.generate({ serviceEndpoint: serviceEndpoint });
    fs.writeFileSync(config.did.storagePath, JSON.stringify(didState, null, 2));
  } else {
    throw new Error(`DID Method ${config.did.method} not supported`);
  }
}

export class DidLoader {
  static getDid() {
    return didState.did;
  }

  static getSignatureMaterial() {
    const { privateJwk } = didState.keys['key-1'];
    const { alg, kid } = privateJwk;
    const fullKid = `${didState.did}#${kid}`;

    return { privateJwk: privateJwk, protectedHeader: { alg, kid: fullKid } };
  }
}