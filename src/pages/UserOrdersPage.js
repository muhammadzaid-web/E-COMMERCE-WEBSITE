import NavBar from '../features/navbar/Navbar';
import UserOrders from '../features/user/components/UserOrders';
function UserOrdersPage() {
  return (
    <div>
      <NavBar title="My Orders">
        <UserOrders></UserOrders>
      </NavBar>
    </div>
  );
}
export default UserOrdersPage