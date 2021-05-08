
const filterUsers = (allUsers, searchText) => {
  const searchStringInLowerCase = searchText.toLowerCase();
  const users = allUsers.filter((user) => {
    const { name, email, role } = user;
    return (
      name.toLowerCase().includes(searchStringInLowerCase)
      || email.toLowerCase().includes(searchStringInLowerCase)
      || role.toLowerCase().includes(searchStringInLowerCase)
    );
  });
  return users;
};

export default filterUsers;
