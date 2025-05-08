import type { RouterData } from "../types.js";
import type { RouterType } from "../router.types.js";
import { get } from "../utils/getData.js";
import { getTime } from "../utils/getTime.js";

export const handleRoute = async (_: undefined, noCache: boolean) => {
  const listData = await getList(noCache);
  const routeData: RouterData = {
    name: "ysxw-news",
    title: "央视新闻",
    type: "推荐榜",
    link: "https://ysxw.cctv.cn/24hours.html",
    total: listData.data?.length || 0,
    ...listData,
  };
  return routeData;
};

const getList = async (noCache: boolean) => {
  const url = `https://dev.nexthubs.fun/webhook/ysxw`;
  const result = await get({ url, noCache });
  const list = result.data[0].list;
  return {
    ...result,
    data: list.map((v: RouterType["ysxw-news"]) => ({
      id: v.docid,
      title: v.title,
      cover: undefined,
      author: v.source,
      hot: undefined,
      url: `https://ysxw.cctv.cn/article.html?toc_style_id=feeds_default&item_id=${v.docid}`,
      mobileUrl: `https://content-static.cctvnews.cctv.com/snow-book/index.html?toc_style_id=feeds_default&item_id=${v.docid}`,
    })),
  };
};
