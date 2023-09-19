import { IPermissionModel } from "@/redux/models/permission";
import { IRoleModel } from "@/redux/models/role";
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

export default function PermissionDetail() {
  const { permission } = useSelector((state: any) => state.permissionReducer);
  return (
    <section className="text-gray-600">
      <div className="container p-5 mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-xl font-medium text-center title-font text-blueDark">
            {permission?.name?.toUpperCase()}
          </h1>
          <div className="p-4 w-full">
            <h2 className="font-medium title-font tracking-widest text-blueDark mb-4 text-sm text-center sm:text-left">
              Permission Information
            </h2>
            <nav className="flex flex-col sm:items-start sm:text-left text-center items-center -mb-1 space-y-2.5">
              <LineItem name="Name" value={permission?.name.toUpperCase()} />
              <LineItem name="Description" value={permission?.description} />
              <LineItem name="Code" value={permission?.code} />
              <LineItem
                name="Created At"
                value={new FormatDate(permission?.createdAt).toFullDate()}
              />
              <LineItem
                name="Updated At"
                value={new FormatDate(permission?.createdAt).toFullDate()}
              />
              <LineItem
                name="Permission Group"
                value={
                  <Tag color="geekblue" className="text-sm">
                    {permission?.permissionGroup?.name}
                  </Tag>
                }
              />
            </nav>
          </div>
          {permission?.rolePermissions &&
            permission?.rolePermissions.length > 0 && (
              <div className="p-4 w-full">
                <h2 className="font-medium title-font tracking-widest text-blueDark mb-4 text-sm text-center sm:text-left">
                  {`Roles have ${permission?.name?.toUpperCase()} permission`}
                </h2>
                <div className="w-full border-2 my-2 rounded-lg border-gray-200 border-opacity-50 p-4 text-left">
                  {permission?.rolePermissions?.map(
                    (item: { role: IRoleModel }) => (
                      <Tag
                        key={item?.role?.id}
                        color="geekblue"
                        className="uppercase font-medium text-xs"
                      >
                        {item?.role?.name}
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
