import { LinkedinUrl, TwitterUrl, GithubUrl } from '../constants/constants';

export const findSocialLink = (app) => {
  let appUrl = null;
  switch (app) {
    case 'Github':
      appUrl = GithubUrl;
      break;
    case 'Twitter':
      appUrl = TwitterUrl;
      break;
    default:
      appUrl = LinkedinUrl;
  }
  return appUrl;
};
