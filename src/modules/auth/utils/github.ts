import axios from 'axios';
import { AxiosResponse } from 'axios';
import { User } from 'src/modules/users/users.entity';

export const createSessionUser = (user: User) => {
  return {
    id: user.id,
    github_id: user.github_id,
    name: user.name,
    github_username: user.github_username,
    email: user.email,
  };
};

export const getPrimaryEmail = async (octokit: any): Promise<string> => {
  const emailReq = await octokit.request(
    'GET /user/emails{?per_page,page}',
    {},
  );
  const emailData = emailReq.data;
  const primaryEmail = emailData.filter((e) => e.primary == true)[0].email;
  return primaryEmail;
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
