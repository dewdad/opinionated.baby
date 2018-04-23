import "@babel/polyfill";

import { website } from "./website";

let apiURL: string;

if (window.location.hostname === "opinionated.baby") {
  apiURL = "https://api.opinionated.baby/opinionatedbaby/";
} else if (window.location.hostname === "beta.opinionated.baby") {
  apiURL = "https://api-beta.opinionated.baby/betaopinionatedbaby/";
} else {
  apiURL = "http://127.0.0.1:8080/graphql/";
}

window.onload = (): void => {
  website(apiURL);
};