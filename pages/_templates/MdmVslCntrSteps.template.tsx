import { DarkButton } from "@/components/button/darkButton";
import { LightButton } from "@/components/button/lightButton";
import MdmVslCntrForm from "@/components/forms/form-components/MdmVslCntrForm";
import { IMdmVslCntrModel } from "@/redux/models/mdmVslCntr";
import { Steps } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function MdmVslCntrSteps(props: { data: IMdmVslCntrModel }) {
  const data = props?.data;
  const { t } = useTranslation(["mdmVslCntr"]);
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const infomationVesselData = [
    {
      title: "Main Information",
      children: [
        {
          title: t("mdmVslCntr:fields.vsl_eng_nm"),
          name: "vsl_eng_nm",
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.vsl_locl_nm"),
          name: "vsl_locl_nm",
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.crr_cd"),
          name: "crr_cd",
        },
        {
          title: t("mdmVslCntr:fields.vsl_bldr_nm"),
          name: "vsl_bldr_nm",
        },
        {
          title: t("mdmVslCntr:fields.co_cd"),
          name: "co_cd",
        },
        {
          title: t("mdmVslCntr:fields.vsl_bld_area_nm"),
          name: "vsl_bld_area_nm",
        },

        {
          title: t("mdmVslCntr:fields.vsl_own_ind_cd"),
          name: "vsl_own_ind_cd",
        },
        {
          title: t("mdmVslCntr:fields.vsl_rgst_cnt_cd"),
          name: "vsl_rgst_cnt_cd",
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.vsl_bld_cd"),
          name: "vsl_bld_cd",
        },
      ],
    },
    {
      title: "Others",
      children: [
        {
          title: t("mdmVslCntr:fields.eai_evnt_dt"),
          name: "eai_evnt_dt",
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.eai_if_id"),
          name: "eai_if_id",
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.modi_vsl_cd"),
          name: "modi_vsl_cd",
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.modi_vsl_opr_tp_cd"),
          name: "modi_vsl_opr_tp_cd",
          className: "lg:col-span-2 sm:col-span-2",
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
          name: "call_sgn_no",
        },
        {
          title: t("mdmVslCntr:fields.vsl_clss_flg"),
          name: "vsl_clss_flg",
        },
        {
          title: t("mdmVslCntr:fields.rgst_port_cd"),
          name: "rgst_port_cd",
        },
        {
          title: t("mdmVslCntr:fields.clss_no_rgst_area_nm"),
          name: "clss_no_rgst_area_nm",
        },
        {
          title: t("mdmVslCntr:fields.vsl_clss_no"),
          name: "vsl_clss_no",
        },
        {
          title: t("mdmVslCntr:fields.lloyd_no"),
          name: "lloyd_no",
        },
        {
          title: t("mdmVslCntr:fields.vsl_hl_no"),
          name: "vsl_hl_no",
        },
        {
          title: t("mdmVslCntr:fields.crw_knt"),
          name: "crw_knt",
        },
        {
          title: t("mdmVslCntr:fields.piclb_desc"),
          name: "piclb_desc",
        },
        {
          title: t("mdmVslCntr:fields.vsl_edi_nm"),
          name: "vsl_edi_nm",
        },
        {
          title: t("mdmVslCntr:fields.phn_no"),
          name: "phn_no",
        },
        {
          title: t("mdmVslCntr:fields.fax_no"),
          name: "fax_no",
        },
        {
          title: t("mdmVslCntr:fields.tlx_no"),
          name: "tlx_no",
        },
        {
          title: t("mdmVslCntr:fields.vsl_eml"),
          name: "vsl_eml",
        },
        {
          title: t("mdmVslCntr:fields.rgst_no"),
          name: "rgst_no",
        },
        {
          title: t("mdmVslCntr:fields.fdr_div_cd"),
          name: "fdr_div_cd",
        },
        {
          title: t("mdmVslCntr:fields.vsl_kel_ly_dt"),
          name: "vsl_kel_ly_dt",
        },
        {
          title: t("mdmVslCntr:fields.vsl_lnch_dt"),
          name: "vsl_lnch_dt",
        },
        {
          title: t("mdmVslCntr:fields.vsl_de_dt"),
          name: "vsl_de_dt",
        },
        {
          title: t("mdmVslCntr:fields.rgst_dt"),
          name: "rgst_dt",
        },
        {
          title: t("mdmVslCntr:fields.vsl_clz_dt"),
          name: "vsl_clz_dt",
        },
        {
          title: t("mdmVslCntr:fields.vsl_rmk"),
          name: "vsl_rmk",
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
          name: "cntr_dzn_capa",
        },
        {
          title: t("mdmVslCntr:fields.cntr_op_capa"),
          name: "cntr_op_capa",
        },
        {
          title: t("mdmVslCntr:fields.cntr_pnm_capa"),
          name: "cntr_pnm_capa",
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.cntr_vsl_clss_capa"),
          name: "cntr_vsl_clss_capa",
        },
        {
          title: t("mdmVslCntr:fields.ttl_teu_knt"),
          name: "ttl_teu_knt",
        },
        {
          title: t("mdmVslCntr:fields.vsl_htch_knt"),
          name: "vsl_htch_knt",
        },
        {
          title: t("mdmVslCntr:fields.vsl_hld_knt"),
          name: "vsl_hld_knt",
        },
        {
          title: t("mdmVslCntr:fields.rf_rcpt_knt"),
          name: "rf_rcpt_knt",
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.rf_rcpt_max_knt"),
          name: "rf_rcpt_max_knt",
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
          name: "loa_len",
        },
        {
          title: t("mdmVslCntr:fields.lbp_len"),
          name: "lbp_len",
        },
        {
          title: t("mdmVslCntr:fields.smr_drft_hgt"),
          name: "smr_drft_hgt",
        },
        {
          title: t("mdmVslCntr:fields.fbd_capa"),
          name: "fbd_capa",
        },
        {
          title: t("mdmVslCntr:fields.vsl_dpth"),
          name: "vsl_dpth",
        },
        {
          title: t("mdmVslCntr:fields.vsl_hgt"),
          name: "vsl_hgt",
        },
        {
          title: t("mdmVslCntr:fields.vsl_wdt"),
          name: "vsl_wdt",
        },
      ],
    },
    {
      title: "Speed(Knots)",
      children: [
        {
          title: t("mdmVslCntr:fields.ecn_spd"),
          name: "ecn_spd",
        },
        {
          title: t("mdmVslCntr:fields.vsl_svc_spd"),
          name: "vsl_svc_spd",
        },
        {
          title: t("mdmVslCntr:fields.max_spd"),
          name: "max_spd",
        },
      ],
    },
    {
      title: "Other(MT)",
      children: [
        {
          title: t("mdmVslCntr:fields.dpl_capa"),
          name: "dpl_capa",
        },
        {
          title: t("mdmVslCntr:fields.dwt_wgt"),
          name: "dwt_wgt",
        },
        {
          title: t("mdmVslCntr:fields.lgt_shp_tong_wgt"),
          name: "lgt_shp_tong_wgt",
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
          name: "grs_rgst_tong_wgt",
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.net_rgst_tong_wgt"),
          name: "net_rgst_tong_wgt",
          className: "lg:col-span-2 sm:col-span-2",
        },
      ],
    },
    {
      title: "Tonnage Panama",
      children: [
        {
          title: t("mdmVslCntr:fields.pnm_gt_wgt"),
          name: "pnm_gt_wgt",
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.pnm_net_tong_wgt"),
          name: "pnm_net_tong_wgt",
          className: "lg:col-span-2 sm:col-span-2",
        },
      ],
    },
    {
      title: "Tonnage Suez",
      children: [
        {
          title: t("mdmVslCntr:fields.suz_gt_wgt"),
          name: "suz_gt_wgt",
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.suz_net_tong_wgt"),
          name: "suz_net_tong_wgt",
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.madn_voy_suz_net_tong_wgt"),
          name: "madn_voy_suz_net_tong_wgt",
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
          name: "foil_capa",
        },
        {
          title: t("mdmVslCntr:fields.doil_capa"),
          name: "doil_capa",
        },
        {
          title: t("mdmVslCntr:fields.frsh_wtr_capa"),
          name: "frsh_wtr_capa",
        },
        {
          title: t("mdmVslCntr:fields.blst_tnk_capa"),
          name: "blst_tnk_capa",
        },
      ],
    },
    {
      title: "Consumption(MT)",
      children: [
        {
          title: t("mdmVslCntr:fields.foil_csm"),
          name: "foil_csm",
        },
        {
          title: t("mdmVslCntr:fields.doil_csm"),
          name: "doil_csm",
        },
        {
          title: t("mdmVslCntr:fields.frsh_wtr_csm"),
          name: "frsh_wtr_csm",
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
          name: "mn_eng_mkr_nm",
        },
        {
          title: t("mdmVslCntr:fields.mn_eng_tp_desc"),
          name: "mn_eng_tp_desc",
        },
        {
          title: t("mdmVslCntr:fields.mn_eng_bhp_pwr"),
          name: "mn_eng_bhp_pwr",
        },
        {
          title: t("mdmVslCntr:fields.mn_eng_rpm_pwr"),
          name: "mn_eng_rpm_pwr",
        },
      ],
    },
    {
      title: "Bow Thruster",
      children: [
        {
          title: t("mdmVslCntr:fields.bwthst_mkr_nm"),
          name: "bwthst_mkr_nm",
        },
        {
          title: t("mdmVslCntr:fields.bwthst_tp_desc"),
          name: "bwthst_tp_desc",
        },
        {
          title: t("mdmVslCntr:fields.bwthst_bhp_pwr"),
          name: "bwthst_bhp_pwr",
        },
        {
          title: t("mdmVslCntr:fields.bwthst_rpm_pwr"),
          name: "bwthst_rpm_pwr",
        },
      ],
    },
    {
      title: "Generator Engine",
      children: [
        {
          title: t("mdmVslCntr:fields.gnr_mkr_nm"),
          name: "gnr_mkr_nm",
        },
        {
          title: t("mdmVslCntr:fields.gnr_tp_desc"),
          name: "gnr_tp_desc",
        },
        {
          title: t("mdmVslCntr:fields.gnr_bhp_pwr"),
          name: "gnr_bhp_pwr",
        },
        {
          title: t("mdmVslCntr:fields.gnr_rpm_pwr"),
          name: "gnr_rpm_pwr",
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
          name: "intl_tong_certi_flg",
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.vsl_sft_cstru_certi_exp_dt"),
          name: "vsl_sft_cstru_certi_exp_dt",
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.vsl_sft_rdo_certi_exp_dt"),
          name: "vsl_sft_rdo_certi_exp_dt",
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.vsl_sft_eq_certi_exp_dt"),
          name: "vsl_sft_eq_certi_exp_dt",
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.vsl_lod_line_certi_exp_dt"),
          name: "vsl_lod_line_certi_exp_dt",
          className: "lg:col-span-2 sm:col-span-2",
        },
        {
          title: t("mdmVslCntr:fields.vsl_derat_certi_exp_dt"),
          name: "vsl_derat_certi_exp_dt",
          className: "lg:col-span-2 sm:col-span-2",
        },
      ],
    },
  ];

  const steps = [
    {
      key: "step_0",
      title: "Information of Vessel",
      content: (
        <MdmVslCntrForm
          data={data}
          source={infomationVesselData}
        />
      ),
    },
    {
      key: "step_1",
      title: "Contact",
      content: <MdmVslCntrForm data={data} source={contactVesselData} />,
    },
    {
      key: "step_2",
      title: "CNTR Capacity",
      content: <MdmVslCntrForm data={data} source={cntrCapacityData} />,
    },
    {
      key: "step_3",
      title: "Dimension & Speed",
      content: <MdmVslCntrForm data={data} source={dimensionSpeedData} />,
    },
    {
      key: "step_4",
      title: "Tonnage",
      content: <MdmVslCntrForm data={data} source={tonnageData} />,
    },
    {
      key: "step_5",
      title: "CBM & MT",
      content: <MdmVslCntrForm data={data} source={cbmMtData} />,
    },
    {
      key: "step_6",
      title: "Engine",
      content: <MdmVslCntrForm data={data} source={engineData} />,
    },
    {
      key: "step_7",
      title: "Certificate",
      content: <MdmVslCntrForm data={data} source={certificateData} />,
    },
  ];
  const items = steps.map((item) => ({ key: item.key, title: item.title }));
  return (
    <div className="max-w-7xl mx-auto bg-white rounded-md">
      <h2 className="text-blueDark p-2 text-lg title-font text-center font-medium mb-2 tracking-widest">
        Edit a MDMVSLCNTR
      </h2>
      <section className="flex gap-8 p-4">
        <div className="flex-col border-r-2 px-4 border-blueDark">
          <Steps direction="vertical" current={current} items={items} />
        </div>
        <div className={`flex-1 overflow-y-auto h-[500px]`}>
          <div className="relative">
            <div className="pb-16">{steps[current].content}</div>
            <div className="absolute flex bottom-0 right-0">
              {current > 0 && (
                <LightButton className="mx-2" onClick={() => prev()}>
                  Previous
                </LightButton>
              )}
              {current < steps.length - 1 && (
                <DarkButton className="mx-2" onClick={() => next()}>
                  Next
                </DarkButton>
              )}
              {current === steps.length - 1 && (
                <DarkButton
                  className="mx-2"
                  onClick={() => alert("Processing complete!")}
                >
                  Save
                </DarkButton>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
