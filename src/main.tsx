import { createBrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css'
import routes from './routes/route.tsx';
import { store } from './store/store.ts';
import type { User as UserType } from './types/user.ts';
import axios from 'axios';
import { Provider } from 'react-redux';
import { setUsers } from './store/reducers/user.ts';
import { logout, setUser } from './store/reducers/auth.ts';
import { setLoading } from './store/reducers/loading.ts';


interface UsersResponse {
  users: UserType[];
}

const getUsers = async () => {
  const url = "https://dummyjson.com/users";
  const response = await axios.get<UsersResponse>(url);
  store.dispatch(setUsers(response.data.users))
}

getUsers();

// Restaure la session à partir du token stocké, puis termine le chargement initial
const restoreSession = async () => {
  const token = store.getState().auth.token;
  if (token) {
    try {
      const response = await axios.get<UserType>("https://dummyjson.com/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      store.dispatch(setUser(response.data));
    } catch {
      store.dispatch(logout());
    }
  }
  store.dispatch(setLoading(false));
}

restoreSession();

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

