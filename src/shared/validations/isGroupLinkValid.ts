export const isGroupLinkValid = (groupLink: string) => {
  const rightGroupLinkRegExp = /^https:\/\/t\.me\/[A-Za-z0-9_]+$/;
  return rightGroupLinkRegExp.test(groupLink);
};
