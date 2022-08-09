import { FC, useEffect } from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

// import { useAppDispatch, useAppSelector } from './hooks/redux';
// import { fetchUsers } from './store/reducers/ActionCreators';
// import { userSlice } from './store/reducers/UserSlice';


const App: FC = () => {
  // const dispatch = useAppDispatch()
  // const {users, isLoading, error} = useAppSelector(state => state.userReducer)

  // useEffect(()=>{
  //   dispatch(fetchUsers())
  // }, [])

  return (
    <div className="App">
      <Theme preset={presetGpnDefault}>
        {/* {isLoading && <h1>загрузка...</h1>}
        {error && <h1>{error}</h1>}
        {JSON.stringify(users, null, 2)} */}

        <AppRouter />

      </Theme>
    </div>
  );
}

export default App;
