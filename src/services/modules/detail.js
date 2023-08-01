import kRequest from "../request"

export function getDetailInfos(houseId) {
  return kRequest.get({
    url: "detail/infos",
    params: {
      houseId
    }
  })
}