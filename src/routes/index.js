import homeRoutes from './HomeRoutes';
import userRoutes from './UserRoutes';
import adminRoutes from './AdminRoutes';

export const appRoutes = [
  ...homeRoutes,
  ...userRoutes,
  ...adminRoutes,
];

export default appRoutes;
