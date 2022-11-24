import axios from 'axios';
import { AxiosResponse } from 'axios';
import { Octokit } from 'octokit';

export const Octo = (accessToken: string) => {
  return new Octokit({
    auth: accessToken,
  });
};

export const getAccessToken = async (
  sessionCode: string,
): Promise<AxiosResponse> => {
  return await axios.request({
    url: 'https://github.com/login/oauth/access_token',
    method: 'POST',
    data: {
      client_id: process.env.GITHUB_CLIENT,
      client_secret: process.env.GITHUB_SECRET,
      code: sessionCode,
      redirect_ari: process.env.GITHUB_CALLBACK,
    },
  });
};

export const getUserData = async (accessToken: string): Promise<any> => {
  const emailReq = await Octo(accessToken).request('GET /user', {});
  return emailReq;
};

export const emailReq = async (accessToken: string): Promise<any> => {
  const emailReq = await Octo(accessToken).request(
    'GET /user/emails{?per_page,page}',
    {},
  );

  return emailReq;
};
