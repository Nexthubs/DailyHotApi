import type { RouterData } from "../types.js";
import type { RouterType } from "../router.types.js";
import { get } from "../utils/getData.js";
import { getTime } from "../utils/getTime.js";

export const handleRoute = async (_: undefined, noCache: boolean) => {
  const listData = await getList(noCache);
  const routeData: RouterData = {
    name: "geonews",
    title: "Geo News",
    type: "推荐榜",
    link: "https://www.bbc.com/urdu/topics/cjgn7n9zzq7t",
    total: listData.data?.length || 0,
    ...listData,
  };
  return routeData;
};

const getList = async (noCache: boolean) => {
  const url = `https://n8n.giaogiao.work/webhook/bbcurdu`;
  const result = await get({ url, noCache });
  const list = result.data[0].list;
  return {
    ...result,
    data: list.map((v: RouterType["bbcurdu"]) => ({
      id: v.docid,
      title: v.title,
      url: `https://www.bbc.com/urdu/${v.docid}`,
      mobileUrl: `https://www.bbc.com/urdu/${v.docid}`,
    })),
  };
};
