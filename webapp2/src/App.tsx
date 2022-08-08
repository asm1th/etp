import { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchUsers } from './store/reducers/ActionCreators';
import { userSlice } from './store/reducers/UserSlice';


function App() {
  const dispatch = useAppDispatch()
  const {users} = useAppSelector(state => state.userReducer)

  useEffect(()=>{
    dispatch(fetchUsers())
  }, [])

  return (
    <div className="App">
      {JSON.stringify(users, null, 2)}
    </div>
  );
}

export default App;
