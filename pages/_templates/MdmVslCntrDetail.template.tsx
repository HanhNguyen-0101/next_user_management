/* eslint-disable @next/next/no-img-element */
import {
  faBuilding,
  faCalendarDays,
  faCheck,
  faChevronDown,
  faChevronUp,
  faFlag,
  faShip,
  faUser,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse, Space, Tabs } from "antd";
import { FormatDate } from "pages/_utils/formatData";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const LineItem = ({ title, value, className, icon }: any) => {
  return (
    <Space className={className}>
      <FontAwesomeIcon icon={icon ? icon : faCheck} />
      <span className="font-medium capitalize">{title}: </span>
      <span className={value ? "font-medium text-yellow-400" : "opacity-50"}>
        {value ? value : "N/A"}
      </span>
    </Space>
  );
};
const InformationTab = ({ data }: any) => {
  return data?.map((item: any, index: number) => {
    return (
      <section key={index}>
        {item.title && (
          <h2 className="text-slate-50 text-sm title-font opacity-90 mb-4 tracking-wider capitalize border-b border-text-slate-50 border-opacity-70">
            {item.title}
          </h2>
        )}
        <section className="text-slate-50 body-font w-full mb-6 py-1 grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
          {item?.children?.map((field: any, idx: number) => {
            return (
              <LineItem
                key={idx}
                title={field.title}
                value={field.value}
                className={field.className}
                icon={field.icon}
              />
            );
          })}
        </section>
      </section>
    );
  });
};
export default function MdmVslCntrDetail() {
  const { t } = useTranslation(["mdmVslCntr"]);
  const { mdmVslCntr } = useSelector((state: any) => state.mdmVslCntrReducer);
  const infomationVesselData = [
    {
      title: "Main Information",
      children: [
        {
          title: t("mdmVslCntr:fields.vsl_eng_nm"),
          value: mdmVslCntr?.vsl_eng_nm,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.vsl_locl_nm"),
          value: mdmVslCntr?.vsl_locl_nm,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.crr_cd"),
          value: mdmVslCntr?.crr_cd,
        },
        {
          title: t("mdmVslCntr:fields.vsl_bldr_nm"),
          value: mdmVslCntr?.vsl_bldr_nm,
        },
        {
          title: t("mdmVslCntr:fields.co_cd"),
          value: mdmVslCntr?.co_cd,
        },
        {
          title: t("mdmVslCntr:fields.vsl_bld_area_nm"),
          value: mdmVslCntr?.vsl_bld_area_nm,
        },

        {
          title: t("mdmVslCntr:fields.vsl_own_ind_cd"),
          value: mdmVslCntr?.vsl_own_ind_cd,
        },
        {
          title: t("mdmVslCntr:fields.vsl_rgst_cnt_cd"),
          value: mdmVslCntr?.vsl_rgst_cnt_cd,
        },
        {
          title: t("mdmVslCntr:fields.vsl_bld_cd"),
          value: mdmVslCntr?.vsl_bld_cd,
        },
      ],
    },
    {
      title: "Others",
      children: [
        {
          title: t("mdmVslCntr:fields.eai_evnt_dt"),
          value: mdmVslCntr?.eai_evnt_dt,
        },
        {
          title: t("mdmVslCntr:fields.eai_if_id"),
          value: mdmVslCntr?.eai_if_id,
        },
        {
          title: t("mdmVslCntr:fields.modi_vsl_cd"),
          value: mdmVslCntr?.modi_vsl_cd,
        },
        {
          title: t("mdmVslCntr:fields.modi_vsl_opr_tp_cd"),
          value: mdmVslCntr?.modi_vsl_opr_tp_cd,
        },
      ],
    },
  ];
  const contactVesselData = [
    {
      title: "Contact Information",
      children: [
        {
          title: t("mdmVslCntr:fields.call_sgn_no"),
          value: mdmVslCntr?.call_sgn_no,
        },
        {
          title: t("mdmVslCntr:fields.vsl_clss_flg"),
          value: mdmVslCntr?.vsl_clss_flg,
        },
        {
          title: t("mdmVslCntr:fields.rgst_port_cd"),
          value: mdmVslCntr?.rgst_port_cd,
        },
        {
          title: t("mdmVslCntr:fields.clss_no_rgst_area_nm"),
          value: mdmVslCntr?.clss_no_rgst_area_nm,
        },
        {
          title: t("mdmVslCntr:fields.vsl_clss_no"),
          value: mdmVslCntr?.vsl_clss_no,
        },
        {
          title: t("mdmVslCntr:fields.lloyd_no"),
          value: mdmVslCntr?.lloyd_no,
        },
        {
          title: t("mdmVslCntr:fields.vsl_hl_no"),
          value: mdmVslCntr?.vsl_hl_no,
        },
        {
          title: t("mdmVslCntr:fields.crw_knt"),
          value: mdmVslCntr?.crw_knt,
        },
        {
          title: t("mdmVslCntr:fields.piclb_desc"),
          value: mdmVslCntr?.piclb_desc,
        },
        {
          title: t("mdmVslCntr:fields.vsl_edi_nm"),
          value: mdmVslCntr?.vsl_edi_nm,
        },
        {
          title: t("mdmVslCntr:fields.phn_no"),
          value: mdmVslCntr?.phn_no,
        },
        {
          title: t("mdmVslCntr:fields.fax_no"),
          value: mdmVslCntr?.fax_no,
        },
        {
          title: t("mdmVslCntr:fields.tlx_no"),
          value: mdmVslCntr?.tlx_no,
        },
        {
          title: t("mdmVslCntr:fields.vsl_eml"),
          value: mdmVslCntr?.vsl_eml,
        },
        {
          title: t("mdmVslCntr:fields.rgst_no"),
          value: mdmVslCntr?.rgst_no,
        },
        {
          title: t("mdmVslCntr:fields.fdr_div_cd"),
          value: mdmVslCntr?.fdr_div_cd,
        },
        {
          title: t("mdmVslCntr:fields.vsl_kel_ly_dt"),
          value: mdmVslCntr?.vsl_kel_ly_dt,
        },
        {
          title: t("mdmVslCntr:fields.vsl_lnch_dt"),
          value: mdmVslCntr?.vsl_lnch_dt,
        },
        {
          title: t("mdmVslCntr:fields.vsl_de_dt"),
          value: mdmVslCntr?.vsl_de_dt,
        },
        {
          title: t("mdmVslCntr:fields.rgst_dt"),
          value: mdmVslCntr?.rgst_dt,
        },
        {
          title: t("mdmVslCntr:fields.vsl_clz_dt"),
          value: mdmVslCntr?.vsl_clz_dt,
        },
        {
          title: t("mdmVslCntr:fields.vsl_rmk"),
          value: mdmVslCntr?.vsl_rmk,
          className: "lg:col-span-3 sm:col-span-2",
        },
      ],
    },
  ];
  const cntrCapacityData = [
    {
      title: "CNTR Capacity",
      children: [
        {
          title: t("mdmVslCntr:fields.cntr_dzn_capa"),
          value: mdmVslCntr?.cntr_dzn_capa,
        },
        {
          title: t("mdmVslCntr:fields.cntr_op_capa"),
          value: mdmVslCntr?.cntr_op_capa,
        },
        {
          title: t("mdmVslCntr:fields.cntr_pnm_capa"),
          value: mdmVslCntr?.cntr_pnm_capa,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.cntr_vsl_clss_capa"),
          value: mdmVslCntr?.cntr_vsl_clss_capa,
        },
        {
          title: t("mdmVslCntr:fields.ttl_teu_knt"),
          value: mdmVslCntr?.ttl_teu_knt,
        },
        {
          title: t("mdmVslCntr:fields.vsl_htch_knt"),
          value: mdmVslCntr?.vsl_htch_knt,
        },
        {
          title: t("mdmVslCntr:fields.vsl_hld_knt"),
          value: mdmVslCntr?.vsl_hld_knt,
        },
        {
          title: t("mdmVslCntr:fields.rf_rcpt_knt"),
          value: mdmVslCntr?.rf_rcpt_knt,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.rf_rcpt_max_knt"),
          value: mdmVslCntr?.rf_rcpt_max_knt,
          className: "lg:col-span-2 sm:col-span-2",
        },
      ],
    },
  ];
  const dimensionSpeedData = [
    {
      title: "Dimension(M)",
      children: [
        {
          title: t("mdmVslCntr:fields.loa_len"),
          value: mdmVslCntr?.loa_len,
        },
        {
          title: t("mdmVslCntr:fields.lbp_len"),
          value: mdmVslCntr?.lbp_len,
        },
        {
          title: t("mdmVslCntr:fields.smr_drft_hgt"),
          value: mdmVslCntr?.smr_drft_hgt,
        },
        {
          title: t("mdmVslCntr:fields.fbd_capa"),
          value: mdmVslCntr?.fbd_capa,
        },
        {
          title: t("mdmVslCntr:fields.vsl_dpth"),
          value: mdmVslCntr?.vsl_dpth,
        },
        {
          title: t("mdmVslCntr:fields.vsl_hgt"),
          value: mdmVslCntr?.vsl_hgt,
        },
        {
          title: t("mdmVslCntr:fields.vsl_wdt"),
          value: mdmVslCntr?.vsl_wdt,
        },
      ],
    },
    {
      title: "Speed(Knots)",
      children: [
        {
          title: t("mdmVslCntr:fields.ecn_spd"),
          value: mdmVslCntr?.ecn_spd,
        },
        {
          title: t("mdmVslCntr:fields.vsl_svc_spd"),
          value: mdmVslCntr?.vsl_svc_spd,
        },
        {
          title: t("mdmVslCntr:fields.max_spd"),
          value: mdmVslCntr?.max_spd,
        },
      ],
    },
    {
      title: "Other(MT)",
      children: [
        {
          title: t("mdmVslCntr:fields.dpl_capa"),
          value: mdmVslCntr?.dpl_capa,
        },
        {
          title: t("mdmVslCntr:fields.dwt_wgt"),
          value: mdmVslCntr?.dwt_wgt,
        },
        {
          title: t("mdmVslCntr:fields.lgt_shp_tong_wgt"),
          value: mdmVslCntr?.lgt_shp_tong_wgt,
        },
      ],
    },
  ];
  const tonnageData = [
    {
      title: "Tonnage International",
      children: [
        {
          title: t("mdmVslCntr:fields.grs_rgst_tong_wgt"),
          value: mdmVslCntr?.grs_rgst_tong_wgt,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.net_rgst_tong_wgt"),
          value: mdmVslCntr?.net_rgst_tong_wgt,
          className: "lg:col-span-2 sm:col-span-2",
        },
      ],
    },
    {
      title: "Tonnage Panama",
      children: [
        {
          title: t("mdmVslCntr:fields.pnm_gt_wgt"),
          value: mdmVslCntr?.pnm_gt_wgt,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.pnm_net_tong_wgt"),
          value: mdmVslCntr?.pnm_net_tong_wgt,
          className: "lg:col-span-2 sm:col-span-2",
        },
      ],
    },
    {
      title: "Tonnage Suez",
      children: [
        {
          title: t("mdmVslCntr:fields.suz_gt_wgt"),
          value: mdmVslCntr?.suz_gt_wgt,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.suz_net_tong_wgt"),
          value: mdmVslCntr?.suz_net_tong_wgt,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.madn_voy_suz_net_tong_wgt"),
          value: mdmVslCntr?.madn_voy_suz_net_tong_wgt,
          className: "lg:col-start-3 lg:col-span-2 sm:col-span-2",
        },
      ],
    },
  ];
  const cbmMtData = [
    {
      title: "Capacity(CBM)",
      children: [
        {
          title: t("mdmVslCntr:fields.foil_capa"),
          value: mdmVslCntr?.foil_capa,
        },
        {
          title: t("mdmVslCntr:fields.doil_capa"),
          value: mdmVslCntr?.doil_capa,
        },
        {
          title: t("mdmVslCntr:fields.frsh_wtr_capa"),
          value: mdmVslCntr?.frsh_wtr_capa,
        },
        {
          title: t("mdmVslCntr:fields.blst_tnk_capa"),
          value: mdmVslCntr?.blst_tnk_capa,
        },
      ],
    },
    {
      title: "Consumption(MT)",
      children: [
        {
          title: t("mdmVslCntr:fields.foil_csm"),
          value: mdmVslCntr?.foil_csm,
        },
        {
          title: t("mdmVslCntr:fields.doil_csm"),
          value: mdmVslCntr?.doil_csm,
        },
        {
          title: t("mdmVslCntr:fields.frsh_wtr_csm"),
          value: mdmVslCntr?.frsh_wtr_csm,
        },
      ],
    },
  ];
  const engineData = [
    {
      title: "Main Engine",
      children: [
        {
          title: t("mdmVslCntr:fields.mn_eng_mkr_nm"),
          value: mdmVslCntr?.mn_eng_mkr_nm,
        },
        {
          title: t("mdmVslCntr:fields.mn_eng_tp_desc"),
          value: mdmVslCntr?.mn_eng_tp_desc,
        },
        {
          title: t("mdmVslCntr:fields.mn_eng_bhp_pwr"),
          value: mdmVslCntr?.mn_eng_bhp_pwr,
        },
        {
          title: t("mdmVslCntr:fields.mn_eng_rpm_pwr"),
          value: mdmVslCntr?.mn_eng_rpm_pwr,
        },
      ],
    },
    {
      title: "Bow Thruster",
      children: [
        {
          title: t("mdmVslCntr:fields.bwthst_mkr_nm"),
          value: mdmVslCntr?.bwthst_mkr_nm,
        },
        {
          title: t("mdmVslCntr:fields.bwthst_tp_desc"),
          value: mdmVslCntr?.bwthst_tp_desc,
        },
        {
          title: t("mdmVslCntr:fields.bwthst_bhp_pwr"),
          value: mdmVslCntr?.bwthst_bhp_pwr,
        },
        {
          title: t("mdmVslCntr:fields.bwthst_rpm_pwr"),
          value: mdmVslCntr?.bwthst_rpm_pwr,
        },
      ],
    },
    {
      title: "Generator Engine",
      children: [
        {
          title: t("mdmVslCntr:fields.gnr_mkr_nm"),
          value: mdmVslCntr?.gnr_mkr_nm,
        },
        {
          title: t("mdmVslCntr:fields.gnr_tp_desc"),
          value: mdmVslCntr?.gnr_tp_desc,
        },
        {
          title: t("mdmVslCntr:fields.gnr_bhp_pwr"),
          value: mdmVslCntr?.gnr_bhp_pwr,
        },
        {
          title: t("mdmVslCntr:fields.gnr_rpm_pwr"),
          value: mdmVslCntr?.gnr_rpm_pwr,
        },
      ],
    },
  ];
  const certificateData = [
    {
      title: "Certificate",
      children: [
        {
          title: t("mdmVslCntr:fields.intl_tong_certi_flg"),
          value: mdmVslCntr?.intl_tong_certi_flg,
          icon: faFlag,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.vsl_sft_cstru_certi_exp_dt"),
          value: mdmVslCntr?.vsl_sft_cstru_certi_exp_dt
            ? new FormatDate(mdmVslCntr?.vsl_sft_cstru_certi_exp_dt).toFullDate()
            : mdmVslCntr?.vsl_sft_cstru_certi_exp_dt,
          icon: faCalendarDays,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.vsl_sft_rdo_certi_exp_dt"),
          value: mdmVslCntr?.vsl_sft_rdo_certi_exp_dt
            ? new FormatDate(mdmVslCntr?.vsl_sft_rdo_certi_exp_dt).toFullDate()
            : mdmVslCntr?.vsl_sft_rdo_certi_exp_dt,
          icon: faCalendarDays,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.vsl_sft_eq_certi_exp_dt"),
          value: mdmVslCntr?.vsl_sft_eq_certi_exp_dt
            ? new FormatDate(mdmVslCntr?.vsl_sft_eq_certi_exp_dt).toFullDate()
            : mdmVslCntr?.vsl_sft_eq_certi_exp_dt,
          icon: faCalendarDays,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.vsl_lod_line_certi_exp_dt"),
          value: mdmVslCntr?.vsl_lod_line_certi_exp_dt
            ? new FormatDate(mdmVslCntr?.vsl_lod_line_certi_exp_dt).toFullDate()
            : mdmVslCntr?.vsl_lod_line_certi_exp_dt,
          icon: faCalendarDays,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.vsl_derat_certi_exp_dt"),
          value: mdmVslCntr?.vsl_derat_certi_exp_dt,
          icon: faCalendarDays,
          className: "lg:col-span-2 sm:col-span-2",
        },
      ],
    },
  ];
  const steps = [
    {
      key: "step_0",
      icon: <FontAwesomeIcon icon={faShip} />,
      name: "Information of Vessel",
      children: <InformationTab data={infomationVesselData} />,
    },
    {
      key: "step_1",
      icon: <FontAwesomeIcon icon={faShip} />,
      name: "Contact",
      children: <InformationTab data={contactVesselData} />,
    },
    {
      key: "step_2",
      icon: <FontAwesomeIcon icon={faShip} />,
      name: "CNTR Capacity",
      children: <InformationTab data={cntrCapacityData} />,
    },
    {
      key: "step_3",
      icon: <FontAwesomeIcon icon={faShip} />,
      name: "Dimension & Speed",
      children: <InformationTab data={dimensionSpeedData} />,
    },
    {
      key: "step_4",
      icon: <FontAwesomeIcon icon={faShip} />,
      name: "Tonnage",
      children: <InformationTab data={tonnageData} />,
    },
    {
      key: "step_5",
      icon: <FontAwesomeIcon icon={faShip} />,
      name: "CBM & MT",
      children: <InformationTab data={cbmMtData} />,
    },
    {
      key: "step_6",
      icon: <FontAwesomeIcon icon={faShip} />,
      name: "Engine",
      children: <InformationTab data={engineData} />,
    },
    {
      key: "step_7",
      icon: <FontAwesomeIcon icon={faShip} />,
      name: "Certificate",
      children: <InformationTab data={certificateData} />,
    },
  ];
  return (
    <div className="bg-blueDark rounded-md p-5 max-w-7xl mx-auto">
      <section className="text-gray-600 body-font border p-3 rounded-lg bg-white shadow-xl">
        <h2 className="text-blueDark text-lg title-font text-center font-medium mb-2 tracking-widest capitalize">
          {t("mdmVslCntr:fields.vsl_cd")} - {mdmVslCntr?.vsl_cd}
          <Link className="text-blueDark mx-4 hover:text-blue-600" href={`/mdm_vsl_cntr/edit/${mdmVslCntr?.id}`}><FontAwesomeIcon icon={faPenToSquare}/></Link>
        </h2>
        <section className="text-gray-600 body-font p-4 w-full py-1 grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
          <LineItem
            title={t("mdmVslCntr:fields.modi_ownr_nm")}
            value={mdmVslCntr?.modi_ownr_nm}
          />
          <LineItem
            title={t("mdmVslCntr:fields.modi_alln_vsl_cd")}
            value={mdmVslCntr?.modi_alln_vsl_cd}
          />
          <LineItem
            className="lg:col-span-2 sm:col-span-2"
            title={t("mdmVslCntr:fields.lgcy_vsl_cd")}
            value={
              <div className="inline-block">
                <Space className="mx-2">
                  <img
                    src="/images/logos/NYK_Line_Logo.png"
                    width={70}
                    className="inline-block"
                    alt="NYK Line"
                  />
                  <span
                    className={
                      mdmVslCntr?.nyk_lgcy_vsl_cd_ctnt
                        ? "text-yellow-400"
                        : "text-black opacity-50"
                    }
                  >
                    {mdmVslCntr?.nyk_lgcy_vsl_cd_ctnt || "N/A"}
                  </span>
                </Space>
                <Space className="mx-2">
                  <img
                    src="/images/logos/MOL_Line_Logo.png"
                    width={30}
                    className="inline-block"
                    alt="MOL Line"
                  />
                  <span
                    className={
                      mdmVslCntr?.mol_lgcy_vsl_cd_ctnt
                        ? "text-yellow-400"
                        : "text-black opacity-50"
                    }
                  >
                    {mdmVslCntr?.mol_lgcy_vsl_cd_ctnt || "N/A"}
                  </span>
                </Space>
                <Space className="mx-2">
                  <img
                    src="/images/logos/K_Line_Logo.png"
                    width={70}
                    className="inline-block"
                    alt="K Line"
                  />
                  <span
                    className={
                      mdmVslCntr?.kline_lgcy_vsl_cd_ctnt
                        ? "text-yellow-400"
                        : "text-black opacity-50"
                    }
                  >
                    {mdmVslCntr?.kline_lgcy_vsl_cd_ctnt || "N/A"}
                  </span>
                </Space>
              </div>
            }
          />
          <Collapse
            className="m-0 -my-4 col-span-4 text-right duration-75"
            bordered={false}
            style={{ background: "white" }}
            expandIcon={({ isActive }) => (
              <span className="opacity-50 mx-2 mt-1">
                {isActive ? (
                  <FontAwesomeIcon icon={faChevronDown} />
                ) : (
                  <FontAwesomeIcon icon={faChevronUp} />
                )}
              </span>
            )}
            expandIconPosition="right"
            items={[
              {
                key: "1",
                label: (
                  <span className="font-medium opacity-50 tracking-wider">
                    Information action
                  </span>
                ),
                children: (
                  <div className="text-gray-600 body-font w-full pb-4 grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
                    <LineItem
                      title={t("mdmVslCntr:fields.delt_flg")}
                      value={mdmVslCntr?.delt_flg}
                      icon={faFlag}
                      className="lg:col-span-2 sm:col-span-2"
                    />
                    <LineItem
                      title={t("mdmVslCntr:fields.vsl_delt_ofc_cd")}
                      value={mdmVslCntr?.vsl_delt_ofc_cd}
                      icon={faBuilding}
                    />
                    <LineItem
                      title={t("mdmVslCntr:fields.cre_usr_id")}
                      value={mdmVslCntr?.cre_usr_id}
                      icon={faUser}
                      className="lg:col-span-2 sm:col-span-2"
                    />
                    <LineItem
                      title={t("mdmVslCntr:fields.cre_dt")}
                      value={
                        mdmVslCntr?.cre_dt
                          ? new FormatDate(mdmVslCntr?.cre_dt).toFullDate()
                          : mdmVslCntr?.cre_dt
                      }
                      icon={faCalendarDays}
                    />
                    <LineItem
                      title={t("mdmVslCntr:fields.vsl_cre_ofc_cd")}
                      value={mdmVslCntr?.vsl_cre_ofc_cd}
                      icon={faBuilding}
                    />
                    <LineItem
                      title={t("mdmVslCntr:fields.upd_usr_id")}
                      value={mdmVslCntr?.upd_usr_id}
                      icon={faUser}
                      className="lg:col-span-2 sm:col-span-2"
                    />
                    <LineItem
                      title={t("mdmVslCntr:fields.upd_dt")}
                      value={
                        mdmVslCntr?.upd_dt
                          ? new FormatDate(mdmVslCntr?.upd_dt).toFullDate()
                          : mdmVslCntr?.upd_dt
                      }
                      icon={faCalendarDays}
                    />
                    <LineItem
                      title={t("mdmVslCntr:fields.edw_upd_dt")}
                      value={
                        mdmVslCntr?.edw_upd_dt
                          ? new FormatDate(mdmVslCntr?.edw_upd_dt).toFullDate()
                          : mdmVslCntr?.edw_upd_dt
                      }
                      icon={faCalendarDays}
                    />
                  </div>
                ),
              },
            ]}
          />
        </section>
      </section>
      <Tabs
        className="mt-5"
        tabPosition={window.innerWidth > 767 ? "left" : "top"}
        items={steps.map((item, i) => {
          return {
            label: (
              <Space className="text-base title-font py-1 tracking-wider capitalize">
                {item.icon}
                {item.name}
              </Space>
            ),
            key: item.key,
            children: <div className="py-2.5">{item.children}</div>,
          };
        })}
      />
    </div>
  );
}
