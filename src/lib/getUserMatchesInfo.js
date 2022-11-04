const getUserMatchesInfo = (matches, profileId) => {
  const newUsers = matches.map(match => {
    const usersNew = {...match.users};
    delete usersNew[profileId];

    const [uid, user] = Object.entries(usersNew).flat();

    return {matchId: match.id, ...user};
  });

  return newUsers;
};

export default getUserMatchesInfo;