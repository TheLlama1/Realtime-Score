export const adminUserIds: string[] = process.env.NEXT_PUBLIC_ADMIN_KEY
  ? process.env.NEXT_PUBLIC_ADMIN_KEY.split(",")
  : [];

export const isAdmin = (userId: string): boolean => {
  return adminUserIds.includes(userId);
};
