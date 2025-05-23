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
    link: "https://geotv.giaogiao.work/category/pakistan",
    total: listData.data?.length || 0,
    ...listData,
  };
  return routeData;
};

const getList = async (noCache: boolean) => {
  const url = `https://dev.nexthubs.fun/webhook/geonewsapi`;
  const result = await get({ url, noCache });
  const list = result.data[0].list;
  return {
    ...result,
    data: list.map((v: RouterType["geonews"]) => ({
      id: v.docid,
      title: v.title,
      url: `https://www.geo.tv/latest/${v.docid}`,
      mobileUrl: `https://www.geo.tv/latest/${v.docid}`,
    })),
  };
};
