import request from "@/utils/request";

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
    // url: "https://testshool.zzgoodqc.cn/index.php/index/User/getAllStudentList",
    // method: "get",
    // params,
  });
}
