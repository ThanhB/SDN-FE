import UserTable from "../userTable";

function UserView() {
  return (
    <div className="min-w-[250px]">
      <div className="bg-[#fff] p-5 rounded-t-xl">
        <p className="text-2xl text-black font-bold">Member List</p>
      </div>
      <div className="p-5" data-testid="classTable">
        <UserTable />
      </div>
    </div>
  );
}

export default UserView;
