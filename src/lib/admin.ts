export const adminUserIds: string[] = ["vnvtudOdXxWbQhB7zOjyzsEl27p2"];

export const isAdmin = (userId: string): boolean => {
  return adminUserIds.includes(userId);
};
