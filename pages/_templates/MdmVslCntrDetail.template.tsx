/* eslint-disable @next/next/no-img-element */
import { Collapse, Space, Tabs } from "antd";
import { useTranslation } from "react-i18next";
import { IMdmVslCntrModel } from "@/redux/models/mdmVslCntr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShip,
  faCheck,
  faCalendarDays,
  faFlag,
  faUser,
  faBuilding,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FormatDate } from "pages/_utils/formatData";

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
export default function MdmVslCntrDetail(props: { data: IMdmVslCntrModel }) {
  const data = props?.data;
  const { t } = useTranslation(["mdmVslCntr"]);

  const infomationVesselData = [
    {
      title: "Main Information",
      children: [
        {
          title: t("mdmVslCntr:fields.vsl_eng_nm"),
          value: data.vsl_eng_nm,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.vsl_locl_nm"),
          value: data.vsl_locl_nm,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.crr_cd"),
          value: data.crr_cd,
        },
        {
          title: t("mdmVslCntr:fields.vsl_bldr_nm"),
          value: data.vsl_bldr_nm,
        },
        {
          title: t("mdmVslCntr:fields.co_cd"),
          value: data.co_cd,
        },
        {
          title: t("mdmVslCntr:fields.vsl_bld_area_nm"),
          value: data.vsl_bld_area_nm,
        },

        {
          title: t("mdmVslCntr:fields.vsl_own_ind_cd"),
          value: data.vsl_own_ind_cd,
        },
        {
          title: t("mdmVslCntr:fields.vsl_rgst_cnt_cd"),
          value: data.vsl_rgst_cnt_cd,
        },
        {
          title: t("mdmVslCntr:fields.vsl_bld_cd"),
          value: data.vsl_bld_cd,
        },
      ],
    },
    {
      title: "Others",
      children: [
        {
          title: t("mdmVslCntr:fields.eai_evnt_dt"),
          value: data.eai_evnt_dt,
        },
        {
          title: t("mdmVslCntr:fields.eai_if_id"),
          value: data.eai_if_id,
        },
        {
          title: t("mdmVslCntr:fields.modi_vsl_cd"),
          value: data.modi_vsl_cd,
        },
        {
          title: t("mdmVslCntr:fields.modi_vsl_opr_tp_cd"),
          value: data.modi_vsl_opr_tp_cd,
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
          value: data.call_sgn_no,
        },
        {
          title: t("mdmVslCntr:fields.vsl_clss_flg"),
          value: data.vsl_clss_flg,
        },
        {
          title: t("mdmVslCntr:fields.rgst_port_cd"),
          value: data.rgst_port_cd,
        },
        {
          title: t("mdmVslCntr:fields.clss_no_rgst_area_nm"),
          value: data.clss_no_rgst_area_nm,
        },
        {
          title: t("mdmVslCntr:fields.vsl_clss_no"),
          value: data.vsl_clss_no,
        },
        {
          title: t("mdmVslCntr:fields.lloyd_no"),
          value: data.lloyd_no,
        },
        {
          title: t("mdmVslCntr:fields.vsl_hl_no"),
          value: data.vsl_hl_no,
        },
        {
          title: t("mdmVslCntr:fields.crw_knt"),
          value: data.crw_knt,
        },
        {
          title: t("mdmVslCntr:fields.piclb_desc"),
          value: data.piclb_desc,
        },
        {
          title: t("mdmVslCntr:fields.vsl_edi_nm"),
          value: data.vsl_edi_nm,
        },
        {
          title: t("mdmVslCntr:fields.phn_no"),
          value: data.phn_no,
        },
        {
          title: t("mdmVslCntr:fields.fax_no"),
          value: data.fax_no,
        },
        {
          title: t("mdmVslCntr:fields.tlx_no"),
          value: data.tlx_no,
        },
        {
          title: t("mdmVslCntr:fields.vsl_eml"),
          value: data.vsl_eml,
        },
        {
          title: t("mdmVslCntr:fields.rgst_no"),
          value: data.rgst_no,
        },
        {
          title: t("mdmVslCntr:fields.fdr_div_cd"),
          value: data.fdr_div_cd,
        },
        {
          title: t("mdmVslCntr:fields.vsl_kel_ly_dt"),
          value: data.vsl_kel_ly_dt,
        },
        {
          title: t("mdmVslCntr:fields.vsl_lnch_dt"),
          value: data.vsl_lnch_dt,
        },
        {
          title: t("mdmVslCntr:fields.vsl_de_dt"),
          value: data.vsl_de_dt,
        },
        {
          title: t("mdmVslCntr:fields.rgst_dt"),
          value: data.rgst_dt,
        },
        {
          title: t("mdmVslCntr:fields.vsl_clz_dt"),
          value: data.vsl_clz_dt,
        },
        {
          title: t("mdmVslCntr:fields.vsl_rmk"),
          value: data.vsl_rmk,
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
          value: data.cntr_dzn_capa,
        },
        {
          title: t("mdmVslCntr:fields.cntr_op_capa"),
          value: data.cntr_op_capa,
        },
        {
          title: t("mdmVslCntr:fields.cntr_pnm_capa"),
          value: data.cntr_pnm_capa,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.cntr_vsl_clss_capa"),
          value: data.cntr_vsl_clss_capa,
        },
        {
          title: t("mdmVslCntr:fields.ttl_teu_knt"),
          value: data.ttl_teu_knt,
        },
        {
          title: t("mdmVslCntr:fields.vsl_htch_knt"),
          value: data.vsl_htch_knt,
        },
        {
          title: t("mdmVslCntr:fields.vsl_hld_knt"),
          value: data.vsl_hld_knt,
        },
        {
          title: t("mdmVslCntr:fields.rf_rcpt_knt"),
          value: data.rf_rcpt_knt,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.rf_rcpt_max_knt"),
          value: data.rf_rcpt_max_knt,
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
          value: data.loa_len,
        },
        {
          title: t("mdmVslCntr:fields.lbp_len"),
          value: data.lbp_len,
        },
        {
          title: t("mdmVslCntr:fields.smr_drft_hgt"),
          value: data.smr_drft_hgt,
        },
        {
          title: t("mdmVslCntr:fields.fbd_capa"),
          value: data.fbd_capa,
        },
        {
          title: t("mdmVslCntr:fields.vsl_dpth"),
          value: data.vsl_dpth,
        },
        {
          title: t("mdmVslCntr:fields.vsl_hgt"),
          value: data.vsl_hgt,
        },
        {
          title: t("mdmVslCntr:fields.vsl_wdt"),
          value: data.vsl_wdt,
        },
      ],
    },
    {
      title: "Speed(Knots)",
      children: [
        {
          title: t("mdmVslCntr:fields.ecn_spd"),
          value: data.ecn_spd,
        },
        {
          title: t("mdmVslCntr:fields.vsl_svc_spd"),
          value: data.vsl_svc_spd,
        },
        {
          title: t("mdmVslCntr:fields.max_spd"),
          value: data.max_spd,
        },
      ],
    },
    {
      title: "Other(MT)",
      children: [
        {
          title: t("mdmVslCntr:fields.dpl_capa"),
          value: data.dpl_capa,
        },
        {
          title: t("mdmVslCntr:fields.dwt_wgt"),
          value: data.dwt_wgt,
        },
        {
          title: t("mdmVslCntr:fields.lgt_shp_tong_wgt"),
          value: data.lgt_shp_tong_wgt,
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
          value: data.grs_rgst_tong_wgt,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.net_rgst_tong_wgt"),
          value: data.net_rgst_tong_wgt,
          className: "lg:col-span-2 sm:col-span-2",
        },
      ],
    },
    {
      title: "Tonnage Panama",
      children: [
        {
          title: t("mdmVslCntr:fields.pnm_gt_wgt"),
          value: data.pnm_gt_wgt,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.pnm_net_tong_wgt"),
          value: data.pnm_net_tong_wgt,
          className: "lg:col-span-2 sm:col-span-2",
        },
      ],
    },
    {
      title: "Tonnage Suez",
      children: [
        {
          title: t("mdmVslCntr:fields.suz_gt_wgt"),
          value: data.suz_gt_wgt,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.suz_net_tong_wgt"),
          value: data.suz_net_tong_wgt,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.madn_voy_suz_net_tong_wgt"),
          value: data.madn_voy_suz_net_tong_wgt,
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
          value: data.foil_capa,
        },
        {
          title: t("mdmVslCntr:fields.doil_capa"),
          value: data.doil_capa,
        },
        {
          title: t("mdmVslCntr:fields.frsh_wtr_capa"),
          value: data.frsh_wtr_capa,
        },
        {
          title: t("mdmVslCntr:fields.blst_tnk_capa"),
          value: data.blst_tnk_capa,
        },
      ],
    },
    {
      title: "Consumption(MT)",
      children: [
        {
          title: t("mdmVslCntr:fields.foil_csm"),
          value: data.foil_csm,
        },
        {
          title: t("mdmVslCntr:fields.doil_csm"),
          value: data.doil_csm,
        },
        {
          title: t("mdmVslCntr:fields.frsh_wtr_csm"),
          value: data.frsh_wtr_csm,
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
          value: data.mn_eng_mkr_nm,
        },
        {
          title: t("mdmVslCntr:fields.mn_eng_tp_desc"),
          value: data.mn_eng_tp_desc,
        },
        {
          title: t("mdmVslCntr:fields.mn_eng_bhp_pwr"),
          value: data.mn_eng_bhp_pwr,
        },
        {
          title: t("mdmVslCntr:fields.mn_eng_rpm_pwr"),
          value: data.mn_eng_rpm_pwr,
        },
      ],
    },
    {
      title: "Bow Thruster",
      children: [
        {
          title: t("mdmVslCntr:fields.bwthst_mkr_nm"),
          value: data.bwthst_mkr_nm,
        },
        {
          title: t("mdmVslCntr:fields.bwthst_tp_desc"),
          value: data.bwthst_tp_desc,
        },
        {
          title: t("mdmVslCntr:fields.bwthst_bhp_pwr"),
          value: data.bwthst_bhp_pwr,
        },
        {
          title: t("mdmVslCntr:fields.bwthst_rpm_pwr"),
          value: data.bwthst_rpm_pwr,
        },
      ],
    },
    {
      title: "Generator Engine",
      children: [
        {
          title: t("mdmVslCntr:fields.gnr_mkr_nm"),
          value: data.gnr_mkr_nm,
        },
        {
          title: t("mdmVslCntr:fields.gnr_tp_desc"),
          value: data.gnr_tp_desc,
        },
        {
          title: t("mdmVslCntr:fields.gnr_bhp_pwr"),
          value: data.gnr_bhp_pwr,
        },
        {
          title: t("mdmVslCntr:fields.gnr_rpm_pwr"),
          value: data.gnr_rpm_pwr,
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
          value: data.intl_tong_certi_flg,
          icon: faFlag,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.vsl_sft_cstru_certi_exp_dt"),
          value: data.vsl_sft_cstru_certi_exp_dt
            ? new FormatDate(data.vsl_sft_cstru_certi_exp_dt).toFullDate()
            : data.vsl_sft_cstru_certi_exp_dt,
          icon: faCalendarDays,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.vsl_sft_rdo_certi_exp_dt"),
          value: data.vsl_sft_rdo_certi_exp_dt
            ? new FormatDate(data.vsl_sft_rdo_certi_exp_dt).toFullDate()
            : data.vsl_sft_rdo_certi_exp_dt,
          icon: faCalendarDays,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.vsl_sft_eq_certi_exp_dt"),
          value: data.vsl_sft_eq_certi_exp_dt
            ? new FormatDate(data.vsl_sft_eq_certi_exp_dt).toFullDate()
            : data.vsl_sft_eq_certi_exp_dt,
          icon: faCalendarDays,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.vsl_lod_line_certi_exp_dt"),
          value: data.vsl_lod_line_certi_exp_dt
            ? new FormatDate(data.vsl_lod_line_certi_exp_dt).toFullDate()
            : data.vsl_lod_line_certi_exp_dt,
          icon: faCalendarDays,
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.vsl_derat_certi_exp_dt"),
          value: data.vsl_derat_certi_exp_dt,
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
          {t("mdmVslCntr:fields.vsl_cd")} - {data.vsl_cd}
        </h2>
        <section className="text-gray-600 body-font p-4 w-full py-1 grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
          <LineItem
            title={t("mdmVslCntr:fields.modi_ownr_nm")}
            value={data.modi_ownr_nm}
          />
          <LineItem
            title={t("mdmVslCntr:fields.modi_alln_vsl_cd")}
            value={data.modi_alln_vsl_cd}
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
                      data.nyk_lgcy_vsl_cd_ctnt
                        ? "text-yellow-400"
                        : "text-black opacity-50"
                    }
                  >
                    {data.nyk_lgcy_vsl_cd_ctnt || "N/A"}
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
                      data.mol_lgcy_vsl_cd_ctnt
                        ? "text-yellow-400"
                        : "text-black opacity-50"
                    }
                  >
                    {data.mol_lgcy_vsl_cd_ctnt || "N/A"}
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
                      data.kline_lgcy_vsl_cd_ctnt
                        ? "text-yellow-400"
                        : "text-black opacity-50"
                    }
                  >
                    {data.kline_lgcy_vsl_cd_ctnt || "N/A"}
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
                      value={data.delt_flg}
                      icon={faFlag}
                      className="lg:col-span-2 sm:col-span-2"
                    />
                    <LineItem
                      title={t("mdmVslCntr:fields.vsl_delt_ofc_cd")}
                      value={data.vsl_delt_ofc_cd}
                      icon={faBuilding}
                    />
                    <LineItem
                      title={t("mdmVslCntr:fields.cre_usr_id")}
                      value={data.cre_usr_id}
                      icon={faUser}
                      className="lg:col-span-2 sm:col-span-2"
                    />
                    <LineItem
                      title={t("mdmVslCntr:fields.cre_dt")}
                      value={
                        data.cre_dt
                          ? new FormatDate(data.cre_dt).toFullDate()
                          : data.cre_dt
                      }
                      icon={faCalendarDays}
                    />
                    <LineItem
                      title={t("mdmVslCntr:fields.vsl_cre_ofc_cd")}
                      value={data.vsl_cre_ofc_cd}
                      icon={faBuilding}
                    />
                    <LineItem
                      title={t("mdmVslCntr:fields.upd_usr_id")}
                      value={data.upd_usr_id}
                      icon={faUser}
                      className="lg:col-span-2 sm:col-span-2"
                    />
                    <LineItem
                      title={t("mdmVslCntr:fields.upd_dt")}
                      value={
                        data.upd_dt
                          ? new FormatDate(data.upd_dt).toFullDate()
                          : data.upd_dt
                      }
                      icon={faCalendarDays}
                    />
                    <LineItem
                      title={t("mdmVslCntr:fields.edw_upd_dt")}
                      value={
                        data.edw_upd_dt
                          ? new FormatDate(data.edw_upd_dt).toFullDate()
                          : data.edw_upd_dt
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
