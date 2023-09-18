import { Space, Tag } from "antd";
import { FormatDate } from "pages/_utils/formatData";
import { useSelector } from "react-redux";

const LineItem = ({ name, value }) => {
  return (
    value && (
      <div>
        <span className="text-blueDark w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            className="w-3 h-3"
            viewBox="0 0 24 24"
          >
            <path d="M20 6L9 17l-5-5"></path>
          </svg>
        </span>
        <span>
          <span className="opacity-70">{name}</span> :{" "}
          <span className="font-semibold">{value}</span>
        </span>
      </div>
    )
  );
};

export default function UserDetail() {
  const { user } = useSelector((state: any) => state.userReducer);
  return (
    <section className="text-gray-600">
      <div className="container p-5 mx-auto">
        <div className="text-center mb-10">
          <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-blueDark">
            <Space>
              {user?.firstName}
              {user?.lastName}
            </Space>
          </h1>
          <p className="text-sm leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto mb-2">
            {user?.email}
          </p>
          <div className="p-4 w-full">
            <h2 className="font-medium title-font tracking-widest text-blueDark mb-4 text-sm text-center sm:text-left">
              Profile Information
            </h2>
            <nav className="flex flex-col sm:items-start sm:text-left text-center items-center -mb-1 space-y-2.5">
              <LineItem name="First Name" value={user?.firstName} />
              <LineItem name="Last Name" value={user?.lastName} />
              <LineItem name="Email" value={user?.email} />
              <LineItem name="Country" value={user?.country} />
              <LineItem name="Office Code" value={user?.officeCode} />
              <LineItem name="Global Id" value={user?.globalId} />
              <LineItem
                name="Created At"
                value={new FormatDate(user?.createdAt).toFullDate()}
              />
              <LineItem
                name="Updated By"
                value={user?.updatedBy ? `${user?.updatedByUser?.firstName} ${user?.updatedByUser?.lastName} - ${user?.updatedByUser?.email}` : ""}
              />
              <LineItem
                name="Updated At"
                value={new FormatDate(user?.updatedAt).toFullDate()}
              />
              <LineItem
                name="Status"
                value={
                  <Space>
                    <Tag color={user?.isDisable ? "warning" : "success"}>
                      {user?.isDisable ? "Disabled" : "Enabled"}
                    </Tag>
                    <Tag color={user?.isPending ? "warning" : "success"}>
                      {user?.isPending ? "Pending" : "Done"}
                    </Tag>
                    <Tag
                      color={
                        user?.isRegisteredWithGoogle ? "warning" : "success"
                      }
                    >
                      {user?.isDisable ? "Login by Google" : "Login by System"}
                    </Tag>
                  </Space>
                }
              />
            </nav>
          </div>
          <div className="p-4 w-full">
            <h2 className="font-medium title-font tracking-widest text-blueDark mb-4 text-sm text-center sm:text-left">
              Roles / Permissions
            </h2>
            {user?.userRoles?.map((userRole) => (
              <>
                <div className="w-full" key={userRole?.role?.id}>
                  <div className="flex border-2 my-2 rounded-lg border-gray-200 border-opacity-50 p-4 flex-row">
                    <div className="inline-flex items-center justify-center border-r-2 title-font font-medium pr-4 text-blueDark">
                      {userRole?.role?.name.toUpperCase()}
                    </div>
                    <div className="text-left pl-4">
                      {userRole?.role?.rolePermissions?.map(
                        (rolePermission) => (
                          <Tag
                            key={rolePermission?.permission?.id}
                            className="text-[10px]"
                            color="geekblue"
                          >
                            {rolePermission?.permission?.name.toUpperCase()}
                          </Tag>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
