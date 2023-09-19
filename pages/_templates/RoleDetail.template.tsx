import { IPermissionModel } from "@/redux/models/permission";
import { IUserModel } from "@/redux/models/user";
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

export default function RoleDetail() {
  const { role } = useSelector((state: any) => state.roleReducer);
  return (
    <section className="text-gray-600">
      <div className="container p-5 mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-xl font-medium text-center title-font text-blueDark">
            {role?.name?.toUpperCase()}
          </h1>
          <div className="p-4 w-full">
            <h2 className="font-medium title-font tracking-widest text-blueDark mb-4 text-sm text-center sm:text-left">
              Role Information
            </h2>
            <nav className="flex flex-col sm:items-start sm:text-left text-center items-center -mb-1 space-y-2.5">
              <LineItem name="Name" value={role?.name.toUpperCase()} />
              <LineItem name="Description" value={role?.description} />
              <LineItem
                name="Created By"
                value={
                  role?.createdBy
                    ? `${role?.createdByUser?.firstName} ${role?.createdByUser?.lastName} - ${role?.createdByUser?.email}`
                    : ""
                }
              />
              <LineItem
                name="Created At"
                value={new FormatDate(role?.createdAt).toFullDate()}
              />
              <LineItem
                name="Updated By"
                value={
                  role?.updatedBy
                    ? `${role?.updatedByUser?.firstName} ${role?.updatedByUser?.lastName} - ${role?.updatedByUser?.email}`
                    : ""
                }
              />
              <LineItem
                name="Updated At"
                value={new FormatDate(role?.updatedAt).toFullDate()}
              />
            </nav>
          </div>
          {role?.userRoles && role?.userRoles.length > 0 && (
            <div className="p-4 w-full">
              <h2 className="font-medium title-font tracking-widest text-blueDark mb-4 text-sm text-center sm:text-left">
                {`Users have ${role?.name?.toUpperCase()} role`}
              </h2>
              {role?.userRoles?.map((item: { user: IUserModel }) => {
                return (
                  <div className="w-full" key={item?.user?.id}>
                    <div className="flex border-2 my-1.5 rounded-lg border-gray-200 border-opacity-50 px-4 py-2 flex-row">
                      <div className="inline-flex items-center justify-center border-r-2 title-font font-medium pr-4 text-blueDark">
                        <Space>
                          {item?.user?.firstName}
                          {item?.user?.lastName}
                        </Space>
                      </div>
                      <div className="text-left pl-4">{item?.user?.email}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {role?.rolePermissions && role?.rolePermissions.length > 0 && (
            <div className="p-4 w-full">
              <h2 className="font-medium title-font tracking-widest text-blueDark mb-4 text-sm text-center sm:text-left">
                {`Permissions of ${role?.name?.toUpperCase()} role`}
              </h2>
              <div className="w-full border-2 my-2 rounded-lg border-gray-200 border-opacity-50 p-4 text-left">
                {role?.rolePermissions?.map(
                  (item: { permission: IPermissionModel }) => (
                    <Tag
                      key={item?.permission?.id}
                      color="geekblue"
                      className="uppercase font-medium text-xs"
                    >
                      {item?.permission?.name}
                    </Tag>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
