import { useSelector } from 'react-redux';
import { userDetails } from '../userSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const token = useSelector(userDetails);
  const navigate = useNavigate();

  useEffect(() => {
    if (token.credentials == "") {
      navigate("/");
    }
  }, []);
  return (
    <div>Profile {token.credentials}</div>
  )
}
