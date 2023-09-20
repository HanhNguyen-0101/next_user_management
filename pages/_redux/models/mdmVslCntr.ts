import { QueryPayload } from "./common";

export interface IMdmVslCntrModel {
  id?: string | number;
  vsl_cd?: string | number;
  vsl_clss_flg?: string | number;
  vsl_eng_nm?: string | number;
  vsl_locl_nm?: string | number;
  foil_capa?: string | number;
  doil_capa?: string | number;
  frsh_wtr_capa?: string | number;
  call_sgn_no?: string | number;
  rgst_no?: string | number;
  phn_no?: string | number;
  fax_no?: string | number;
  tlx_no?: string | number;
  vsl_eml?: string | number;
  piclb_desc?: string | number;
  rgst_port_cd?: string | number;
  clss_no_rgst_area_nm?: string | number;
  vsl_clss_no?: string | number;
  vsl_bldr_nm?: string | number;
  loa_len?: string | number;
  lbp_len?: string | number;
  vsl_wdt?: string | number;
  vsl_dpth?: string | number;
  smr_drft_hgt?: string | number;
  dwt_wgt?: string | number;
  lgt_shp_tong_wgt?: string | number;
  grs_rgst_tong_wgt?: string | number;
  net_rgst_tong_wgt?: string | number;
  pnm_gt_wgt?: string | number;
  pnm_net_tong_wgt?: string | number;
  suz_gt_wgt?: string | number;
  suz_net_tong_wgt?: string | number;
  mn_eng_mkr_nm?: string | number;
  mn_eng_tp_desc?: string | number;
  mn_eng_bhp_pwr?: string | number;
  vsl_own_ind_cd?: string | number;
  vsl_rgst_cnt_cd?: string | number;
  vsl_bld_cd?: string | number;
  crr_cd?: string | number;
  fdr_div_cd?: string | number;
  vsl_svc_spd?: string | number;
  max_spd?: string | number;
  ecn_spd?: string | number;
  crw_knt?: string | number;
  cntr_dzn_capa?: string | number;
  cntr_op_capa?: string | number;
  cntr_pnm_capa?: string | number;
  cntr_vsl_clss_capa?: string | number;
  rf_rcpt_knt?: string | number;
  rf_rcpt_max_knt?: string | number;
  fbd_capa?: string | number;
  dpl_capa?: string | number;
  blst_tnk_capa?: string | number;
  foil_csm?: string | number;
  doil_csm?: string | number;
  frsh_wtr_csm?: string | number;
  mn_eng_rpm_pwr?: string | number;
  gnr_rpm_pwr?: string | number;
  vsl_hgt?: string | number;
  rgst_dt?: string | number;
  vsl_edi_nm?: string | number;
  co_cd?: string | number;
  vsl_clz_dt?: string | number;
  vsl_cre_ofc_cd?: string | number;
  vsl_delt_ofc_cd?: string | number;
  vsl_bld_area_nm?: string | number;
  gnr_mkr_nm?: string | number;
  gnr_tp_desc?: string | number;
  gnr_bhp_pwr?: string | number;
  bwthst_mkr_nm?: string | number;
  bwthst_tp_desc?: string | number;
  bwthst_bhp_pwr?: string | number;
  bwthst_rpm_pwr?: string | number;
  lloyd_no?: string | number;
  vsl_lnch_dt?: string | number;
  vsl_de_dt?: string | number;
  vsl_kel_ly_dt?: string | number;
  vsl_hl_no?: string | number;
  ttl_teu_knt?: string | number;
  vsl_htch_knt?: string | number;
  vsl_hld_knt?: string | number;
  vsl_rmk?: string | number;
  intl_tong_certi_flg?: string | number;
  madn_voy_suz_net_tong_wgt?: string | number;
  vsl_sft_cstru_certi_exp_dt?: string | number;
  vsl_sft_rdo_certi_exp_dt?: string | number;
  vsl_sft_eq_certi_exp_dt?: string | number;
  vsl_lod_line_certi_exp_dt?: string | number;
  vsl_derat_certi_exp_dt?: string | number;
  cre_usr_id?: string | number;
  cre_dt?: string | number;
  upd_usr_id?: string | number;
  upd_dt?: string | number;
  delt_flg?: string | number;
  eai_evnt_dt?: string | number;
  eai_if_id?: string | number;
  modi_vsl_cd?: string | number;
  edw_upd_dt?: string | number;
  modi_vsl_opr_tp_cd?: string | number;
  modi_ownr_nm?: string | number;
  modi_alln_vsl_cd?: string | number;
  nyk_lgcy_vsl_cd_ctnt?: string | number;
  mol_lgcy_vsl_cd_ctnt?: string | number;
  kline_lgcy_vsl_cd_ctnt?: string | number;
  lgcy_co_cd?: string | number;
}
export interface IMdmVslCntrArrayModel {
  data: Array<IMdmVslCntrModel>;
}

export interface MdmVslCntrState {
  mdmVslCntrData?: {
    currentPage: number;
    data: Array<IMdmVslCntrModel>;
    nextPage: number;
    prevPage: number;
    total: number;
  } | null;
  error?: string | null;
  mdmVslCntr?: IMdmVslCntrModel | null;
  query?: QueryPayload;
}

export interface GetMdmVslCntrByIdPayload {
  id: number | string;
}
export interface GetMdmVslCntrResponse {
  data: IMdmVslCntrModel;
  status: number;
}
export interface DeleteMdmVslCntrResponse {
  data: string;
  status: number;
}

