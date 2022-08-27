import { FC, useEffect } from 'react';
import AppRouter from './components/AppRouter';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchUsers } from './store/reducers/user/action-creators';
//import { userSlice } from './store/reducers/user/userSlice';


const App: FC = () => {
  const dispatch = useAppDispatch()
  const {users, isLoading, error} = useAppSelector(state => state.userReducer)

  useEffect(()=>{
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div className="App">
      <Theme preset={presetGpnDefault}>
        
        <AppRouter />

        {isLoading && <div>загрузка...</div>}
        {error && <div>{error}</div>}
        {JSON.stringify(users, null, 2)}

      </Theme>
    </div>
  );
}

export default App;
