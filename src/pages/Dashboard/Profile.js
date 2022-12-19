import { useState } from "react"
import { FormRow } from '../../components';
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { updateUser } from "../../Features/user/userSlice";

const Profile = () => {
  const { isLoading, user } = useSelector((store => store.user));
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, location, email, lastName } = userData;
    if (!name || !email || !lastName || !location) {
      toast.error('please fill out all fields');
      return;
    }
    dispatch(updateUser(userData));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });

  }




  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className="form-center">

          {/* Input for name */}
          <FormRow type='text'
            name="name"
            value={userData.name}
            handleChange={handleChange} />

          {/* Input for lastName*/}
          <FormRow type='text'
            labelText="last name"
            name="lastName"
            value={userData.lastName}
            handleChange={handleChange} />


          {/* Input for */}
          <FormRow type='email'
            name="email"
            value={userData.email}
            handleChange={handleChange} />


          {/* Input for location */}
          <FormRow type='text'
            name="location"
            value={userData.location}
            handleChange={handleChange} />

          <button type='submit' className="btn btn-block" disabled={isLoading}>
            {isLoading ? " please wait..." : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile