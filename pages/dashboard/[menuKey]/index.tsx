import { GetStaticPaths, GetStaticProps } from "next";

const index = ({ menuKey }: {menuKey: string}) => {
  return <div>{menuKey}</div>;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      ...params,
    },
    revalidate: false
  };
};

export default index;
