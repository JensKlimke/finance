const allRoles = {
  user: ['getUserItems', 'manageUserItems', 'getUserInformation'],
  admin: ['getUsers', 'manageUsers', 'getUserItems', 'manageUserItems', 'getUserInformation', 'getUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export {
  roles,
  roleRights,
};
