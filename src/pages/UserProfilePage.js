import NavBar from '../features/navbar/Navbar';
import UserProfile from '../features/user/components/UserProfile';
function UserProfilePage() {
  return (
    <div>
      <NavBar title="My Profile">
        <UserProfile></UserProfile>
      </NavBar>
    </div>
  );
}
export default UserProfilePage