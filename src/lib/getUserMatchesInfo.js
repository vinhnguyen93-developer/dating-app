const getUserMatchesInfo = (matches, profileId) => {
  const newUsers = matches.map(match => {
    const usersNew = {...match.users};
    delete usersNew[profileId];

    const [uid, user] = Object.entries(usersNew).flat();

    return {
      isNewMatch: match.isNewMatch,
      matchId: match.id,
      matchTime: match.timestamp,
      ...user,
    };
  });

  return newUsers;
};

export default getUserMatchesInfo;
