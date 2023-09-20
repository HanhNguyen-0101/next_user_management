import { Form } from "antd";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { InputFormField } from "../form-fields";

const fields = [
  { name: "id" },
  { name: "vsl_cd" },
  { name: "vsl_clss_flg" },
  { name: "vsl_eng_nm" },
  { name: "vsl_locl_nm" },
  { name: "foil_capa" },
  { name: "doil_capa" },
  { name: "frsh_wtr_capa" },
  { name: "call_sgn_no" },
  { name: "rgst_no" },
  { name: "phn_no" },
  { name: "fax_no" },
  { name: "tlx_no" },
  { name: "vsl_eml" },
  { name: "piclb_desc" },
  { name: "rgst_port_cd" },
  { name: "clss_no_rgst_area_nm" },
  { name: "vsl_clss_no" },
  { name: "vsl_bldr_nm" },
  { name: "loa_len" },
  { name: "lbp_len" },
  { name: "vsl_wdt" },
  { name: "vsl_dpth" },
  { name: "smr_drft_hgt" },
  { name: "dwt_wgt" },
  { name: "lgt_shp_tong_wgt" },
  { name: "grs_rgst_tong_wgt" },
  { name: "net_rgst_tong_wgt" },
  { name: "pnm_gt_wgt" },
  { name: "pnm_net_tong_wgt" },
  { name: "suz_gt_wgt" },
  { name: "suz_net_tong_wgt" },
  { name: "mn_eng_mkr_nm" },
  { name: "mn_eng_tp_desc" },
  { name: "mn_eng_bhp_pwr" },
  { name: "vsl_own_ind_cd" },
  { name: "vsl_rgst_cnt_cd" },
  { name: "vsl_bld_cd" },
  { name: "crr_cd" },
  { name: "fdr_div_cd" },
  { name: "vsl_svc_spd" },
  { name: "max_spd" },
  { name: "ecn_spd" },
  { name: "crw_knt" },
  { name: "cntr_dzn_capa" },
  { name: "cntr_op_capa" },
  { name: "cntr_pnm_capa" },
  { name: "cntr_vsl_clss_capa" },
  { name: "rf_rcpt_knt" },
  { name: "rf_rcpt_max_knt" },
  { name: "fbd_capa" },
  { name: "dpl_capa" },
  { name: "blst_tnk_capa" },
  { name: "foil_csm" },
  { name: "doil_csm" },
  { name: "frsh_wtr_csm" },
  { name: "mn_eng_rpm_pwr" },
  { name: "gnr_rpm_pwr" },
  { name: "vsl_hgt" },
  { name: "rgst_dt" },
  { name: "vsl_edi_nm" },
  { name: "co_cd" },
  { name: "vsl_clz_dt" },
  { name: "vsl_cre_ofc_cd" },
  { name: "vsl_delt_ofc_cd" },
  { name: "vsl_bld_area_nm" },
  { name: "gnr_mkr_nm" },
  { name: "gnr_tp_desc" },
  { name: "gnr_bhp_pwr" },
  { name: "bwthst_mkr_nm" },
  { name: "bwthst_tp_desc" },
  { name: "bwthst_bhp_pwr" },
  { name: "bwthst_rpm_pwr" },
  { name: "lloyd_no" },
  { name: "vsl_lnch_dt" },
  { name: "vsl_de_dt" },
  { name: "vsl_kel_ly_dt" },
  { name: "vsl_hl_no" },
  { name: "ttl_teu_knt" },
  { name: "vsl_htch_knt" },
  { name: "vsl_hld_knt" },
  { name: "vsl_rmk" },
  { name: "intl_tong_certi_flg" },
  { name: "madn_voy_suz_net_tong_wgt" },
  { name: "vsl_sft_cstru_certi_exp_dt" },
  { name: "vsl_sft_rdo_certi_exp_dt" },
  { name: "vsl_sft_eq_certi_exp_dt" },
  { name: "vsl_lod_line_certi_exp_dt" },
  { name: "vsl_derat_certi_exp_dt" },
  { name: "cre_usr_id" },
  { name: "cre_dt" },
  { name: "upd_usr_id" },
  { name: "upd_dt" },
  { name: "delt_flg" },
  { name: "eai_evnt_dt" },
  { name: "eai_if_id" },
  { name: "modi_vsl_cd" },
  { name: "edw_upd_dt" },
  { name: "modi_vsl_opr_tp_cd" },
  { name: "modi_ownr_nm" },
  { name: "modi_alln_vsl_cd" },
  { name: "nyk_lgcy_vsl_cd_ctnt" },
  { name: "mol_lgcy_vsl_cd_ctnt" },
  { name: "kline_lgcy_vsl_cd_ctnt" },
  { name: "lgcy_co_cd" },
];

export default function MdmVslCntrForm({
  data,
  clearData,
  disabled,
  onSubmitForm,
}: any) {
  const { t } = useTranslation(["common", "auth"]);

  const initialValues =  {};
  fields.map(i => {
    initialValues[i.name] = clearData ? "" : data[i.name];
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: async (values) => {
      onSubmitForm(values);
    },
  });

  return (
    <Form
      layout="vertical"
      colon={false}
      className="px-4"
      onSubmitCapture={formik.handleSubmit}
      disabled={disabled}
    >
      {!disabled && (
        <button
          className="fixed w-14 h-14 bottom-4 right-4 rounded-full z-20 text-base font-medium bg-blueDark text-white"
          onClick={formik.handleSubmit}
        >
          Save
        </button>
      )}
      <InputFormField
        formik={formik}
        label="vsl_cd"
        name="vsl_cd"
        width={100}
        isRequired={true}
      />
    </Form>
  );
}
