import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchUsers } from './store/reducers/user/action-creators';
//import { userSlice } from './store/reducers/user/userSlice';

//test
import { useProtectedMutation } from './services/authService'
import { useLoginMutation } from './services/authService'
//

const App: FC = () => {
  const dispatch = useAppDispatch()
  

  //test
  const [login, { data } ] = useLoginMutation();
  const [attemptAccess, {}] = useProtectedMutation();
  //

  //
  const {users, isLoading, error} = useAppSelector(state => state.userReducer)
  useEffect(()=>{
    dispatch(fetchUsers())
  }, [dispatch])
  //

  return (
    <div className="App">
      <Theme preset={presetGpnDefault}>
        
        <AppRouter />
        <Link to="/etp/">etp rnmc</Link> .
        <Link to="/etp/login">login</Link> .
        <Link to="/etp/logincode">login code</Link> .
        <Link to="/etp/reg">регистрация</Link>  .
        <hr/>
        <Link to="/">rnmc</Link> .
        <Link to="/login">login</Link> .
        <Link to="/code">login code</Link> .
        <Link to="/logout">logout</Link> .
        <Link to="/404">404</Link> 

        {/* <hr/>
        fetchUsers
        {isLoading && <div>загрузка...</div>}
        {error && <div>{error}</div>}
        {JSON.stringify(users, null, 2)}


        <hr/>

          <Button label="Login" onClick={() => login({email:"1@1.1", password:"1"})} />
          <Button label="Запрос /users с токеном" onClick={() => attemptAccess()}  />
          <div>
              {data ? (
                  <>
                      Data:
                      <pre>{JSON.stringify(data, null, 2)}</pre>
                  </>
              ) : error ? (
                  <>
                      Error: <pre>{JSON.stringify(error, null, 2)}</pre>
                  </>
              ) : null}
          </div> */}

      </Theme>
    </div>
  );
}

export default App;
