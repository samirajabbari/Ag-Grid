const componiesList = (serverList, serverId) => {
  

  const server = serverList.find((server) => server.id === serverId);

  return server ? server.companies : [];
};

export default componiesList;
