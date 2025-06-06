import type { RouterData } from "../types.js";
import type { RouterType } from "../router.types.js";
import { get } from "../utils/getData.js";
import { getTime } from "../utils/getTime.js";

export const handleRoute = async (_: undefined, noCache: boolean) => {
  const listData = await getList(noCache);
  const routeData: RouterData = {
    name: "vnexpress",
    title: "VN Express",
    type: "推荐榜",
    link: "https://vnexpress.net/tin-nong",
    total: listData.data?.length || 0,
    ...listData,
  };
  return routeData;
};

const getList = async (noCache: boolean) => {
  const url = `https://dev.nexthubs.fun/webhook/vnexpress`;
  const result = await get({ url, noCache });
  const list = result.data[0].list;
  return {
    ...result,
    data: list.map((v: RouterType["vnexpress"]) => ({
      id: v.docid,
      title: v.title,
      url: `https://vnexpress.net/${v.docid}`,
      mobileUrl: `https://vnexpress.net/${v.docid}`,
    })),
  };
};
