import { User } from 'src/modules/users/users.entity';

export const createSessionUser = (user: User) => {
  return {
    id: user.id,
    github_id: user.github_id,
    name: user.name,
    github_username: user.github_username,
    email: user.email,
    isAdmin: user.isAdmin,
  };
};

export const getPrimaryEmailFromReq = (req: any): string => {
  const emailData = req.data;
  const primaryEmail = emailData.filter((e) => e.primary == true)[0].email;
  return primaryEmail;
};

export const getNowTimeString = (): Date => {
  const date = new Date(Date.now());
  return date;
};

export const buildNewUser = (
  userData: any,
  primaryEmail: string,
  ip: string,
): User => {
  const newUser = new User();
  newUser.name = userData.name;
  newUser.github_id = userData.id.toString();
  newUser.github_username = userData.login;
  newUser.email = primaryEmail;
  newUser.image = userData.avatar_url;
  newUser.location = userData.location;
  newUser.last_ip = ip;
  newUser.last_login = getNowTimeString();
  newUser.sign_in_count += 1;
  return newUser;
};
