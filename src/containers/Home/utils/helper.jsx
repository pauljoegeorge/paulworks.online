import { LinkedinUrl, TwitterUrl, GithubUrl } from "../constants/constants";

// eslint-disable-next-line indent
export const findSocialLink = (app) => {
  let appUrl = null;
  if (app === "Github") {
    appUrl = GithubUrl;
  } else if (app === "Twitter") {
    appUrl = TwitterUrl;
  } else {
    appUrl = LinkedinUrl;
  }
  return appUrl;
};
