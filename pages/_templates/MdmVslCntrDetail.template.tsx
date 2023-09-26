import { Tabs } from "antd";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";

const LineItem = ({ title, value }) => {
  return (
    <span>
      <span className="text-blueDark w-4 h-4 mr-2 rounded-full inline-flex items-center justify-center">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          className="w-4 h-4"
          viewBox="0 0 24 24"
        >
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
      </span>
      <span className="opacity-70">{title}</span> /{" "}
      <span className="font-medium">{value}</span>
    </span>
  );
};

export default function MdmVslCntrDetail({ data }) {
  console.log("-------------", data);
  const steps = [
    {
      key: "step_1",
      icon: <AppleOutlined />,
      name: "Information of Vessel",
      children: <>11</>,
    },
    {
      key: "step_2",
      icon: <AndroidOutlined />,
      name: "CNTR Capacity",
      children: <>12121</>,
    },
    {
      key: "step_3",
      icon: <AndroidOutlined />,
      name: "Dimension & Speed",
      children: <>12121</>,
    },
    {
      key: "step_4",
      icon: <AndroidOutlined />,
      name: "CBM & MT",
      children: <>12121</>,
    },
    {
      key: "step_5",
      icon: <AndroidOutlined />,
      name: "Engine",
      children: <>12121</>,
    },
  ];
  return (
    <div className="bg-white rounded-md">
      <section className="text-gray-600 body-font max-w-5xl mx-auto">
        <div className="container p-4 w-full mx-auto">
          <div className="flex border-2 rounded-lg border-blueDark border-opacity-70 p-4 sm:flex-row flex-col">
            <div className="flex-grow">
              <h2 className="text-blueDark text-lg title-font text-center font-medium mb-3 tracking-widest">
                Vessel code - {data.vsl_cd}
              </h2>
              <section className="text-gray-600 body-font">
                <div className="container mx-auto">
                  <div className="flex flex-wrap">
                    <div className="p-4 lg:w-1/3 sm:w-1/2 w-full">
                      <nav className="flex flex-col sm:items-start text-left items-center -mb-1 space-y-2.5">
                        <LineItem title="Vessel Code" value={data.vsl_cd} />
                        <LineItem title="Vessel Code" value={data.vsl_cd} />
                        <LineItem title="Vessel Code" value={data.vsl_cd} />
                        <LineItem title="Vessel Code" value={data.vsl_cd} />
                      </nav>
                    </div>
                    <div className="p-4 lg:w-1/3 sm:w-1/2 w-full">
                      <nav className="flex flex-col sm:items-start text-left items-center -mb-1 space-y-2.5">
                        <LineItem title="Vessel Code" value={data.vsl_cd} />
                        <LineItem title="Vessel Code" value={data.vsl_cd} />
                        <LineItem title="Vessel Code" value={data.vsl_cd} />
                        <LineItem title="Vessel Code" value={data.vsl_cd} />
                      </nav>
                    </div>
                    <div className="p-4 lg:w-1/3 sm:w-1/2 w-full">
                      <nav className="flex flex-col sm:items-start text-left items-center -mb-1 space-y-2.5">
                        <LineItem title="Vessel Code" value={data.vsl_cd} />
                        <LineItem title="Vessel Code" value={data.vsl_cd} />
                        <LineItem title="Vessel Code" value={data.vsl_cd} />
                        <LineItem title="Vessel Code" value={data.vsl_cd} />
                      </nav>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
      <Tabs
        defaultActiveKey="2"
        tabPosition="left"
        className="py-6"
        items={steps.map((item, i) => {
          return {
            label: (
              <span className="px-2">
                {item.icon}
                {item.name}
              </span>
            ),
            key: item.key,
            children: <div className="p-4">{item.children}</div>,
          };
        })}
      />
    </div>
  );
}
