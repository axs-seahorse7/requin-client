const Dashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard Page</h2>

        <button
        style={{marginTop:10}}  
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
          }}>
          Logout
        </button>
        
    </div>
  )
  
};

export default Dashboard;