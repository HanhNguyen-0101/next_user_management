"use client";
import MdmVslCntrForm from "@/components/forms/form-components/MdmVslCntrForm";
import DashboardLayout from "@/components/layout/dashboard.layout";
import { MdmVslCntrAction } from "@/redux/actions";
import { IMdmVslCntrModel } from "@/redux/models/mdmVslCntr";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import MdmVslCntrDetail from "pages/_templates/MdmVslCntrDetail.template";
import { hasPermission, permissionTypes } from "pages/_utils/checkPermission";
import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

export default function MdmVslCntrItemPage(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation();
  const dispatch = useDispatch<Dispatch<any>>();
  const router = useRouter();
  const { mdmVslCntr }: { mdmVslCntr: IMdmVslCntrModel } = useSelector(
    (state: any) => state.mdmVslCntrReducer
  );
  const mdmVslCntrParams = router.query?.mdmVslCntr;
  const action =
    mdmVslCntrParams && mdmVslCntrParams[0] ? mdmVslCntrParams[0] : "";
  const { profile } = useSelector((state: any) => state.authReducer);

  const hasEditPermission = hasPermission(
      permissionTypes.MDM_VSL_CNTR_EDIT,
      profile?.permissionList
    ),
    hasAddPermission = hasPermission(
      permissionTypes.MDM_VSL_CNTR_CREATE,
      profile?.permissionList
    );
  const handleAddItem = (data: IMdmVslCntrModel) => {
    dispatch(MdmVslCntrAction.addItem(data));
  };
  const handleEditItem = (data: IMdmVslCntrModel) => {
    dispatch(MdmVslCntrAction.editItem(data));
  };
  useEffect(() => {
    if (mdmVslCntrParams && mdmVslCntrParams[1]) {
      dispatch(MdmVslCntrAction.getItemById({ id: mdmVslCntrParams[1] }));
    }
  }, []);

  return <div>
    {hasAddPermission && action === "add" && <MdmVslCntrForm clearData={true} onSubmitForm={handleAddItem} />}
    {hasEditPermission && action === "edit" && mdmVslCntr && <MdmVslCntrForm data={mdmVslCntr} onSubmitForm={handleEditItem} />}
    {action === "detail" && mdmVslCntr && <MdmVslCntrDetail data={mdmVslCntr} />}
  </div>
}

MdmVslCntrItemPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout fullWidth={true}>{page}</DashboardLayout>;
};
export const getStaticPaths: GetStaticPaths<{
  mdmVslCntr: any;
}> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: true, //indicates the type of fallback
  };
};
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translationsProps = await serverSideTranslations(locale ?? "en", [
    "common",
  ]);
  return {
    props: {
      ...translationsProps,
    },
  };
};
