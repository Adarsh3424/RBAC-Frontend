// Mock API for User and Role Management
const LOCAL_STORAGE_USERS = "rbac_users";
const LOCAL_STORAGE_ROLES = "rbac_roles";

const initializeData = () => {
  if (!localStorage.getItem(LOCAL_STORAGE_USERS)) {
    const defaultUsers = [
      { id: 1, name: "Alice", roles: ["Admin"], status: "Active" },
      { id: 2, name: "Bob", roles: ["Editor"], status: "Inactive" },
    ];
    localStorage.setItem(LOCAL_STORAGE_USERS, JSON.stringify(defaultUsers));
  }

  if (!localStorage.getItem(LOCAL_STORAGE_ROLES)) {
    const defaultRoles = [
      { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
      { id: 2, name: "Editor", permissions: ["Read", "Write"] },
    ];
    localStorage.setItem(LOCAL_STORAGE_ROLES, JSON.stringify(defaultRoles));
  }
};

const getLocalStorageData = (key) => JSON.parse(localStorage.getItem(key));
const setLocalStorageData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

initializeData();

export const getUsers = () => Promise.resolve(getLocalStorageData(LOCAL_STORAGE_USERS));
export const getRoles = () => Promise.resolve(getLocalStorageData(LOCAL_STORAGE_ROLES));

export const addUser = (user) => {
  const users = getLocalStorageData(LOCAL_STORAGE_USERS);
  users.push({ id: users.length + 1, ...user });
  setLocalStorageData(LOCAL_STORAGE_USERS, users);
  return Promise.resolve(user);
};

export const editUser = (id, updatedUser) => {
  const users = getLocalStorageData(LOCAL_STORAGE_USERS);
  const index = users.findIndex((user) => user.id === id);
  users[index] = { ...users[index], ...updatedUser };
  setLocalStorageData(LOCAL_STORAGE_USERS, users);
  return Promise.resolve(users[index]);
};

export const deleteUser = (id) => {
  const users = getLocalStorageData(LOCAL_STORAGE_USERS).filter((user) => user.id !== id);
  setLocalStorageData(LOCAL_STORAGE_USERS, users);
  return Promise.resolve(id);
};

export const addRole = (role) => {
  const roles = getLocalStorageData(LOCAL_STORAGE_ROLES);
  roles.push({ id: roles.length + 1, ...role });
  setLocalStorageData(LOCAL_STORAGE_ROLES, roles);
  return Promise.resolve(role);
};

export const editRole = (id, updatedRole) => {
  const roles = getLocalStorageData(LOCAL_STORAGE_ROLES);
  const index = roles.findIndex((role) => role.id === id);
  roles[index] = { ...roles[index], ...updatedRole };
  setLocalStorageData(LOCAL_STORAGE_ROLES, roles);
  return Promise.resolve(roles[index]);
};

export const deleteRole = (id) => {
  const roles = getLocalStorageData(LOCAL_STORAGE_ROLES).filter((role) => role.id !== id);
  setLocalStorageData(LOCAL_STORAGE_ROLES, roles);
  return Promise.resolve(id);
};
