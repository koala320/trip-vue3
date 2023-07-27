import kRequest from "../request"

export function getCityAll() {
  return kRequest.get({
    url: "/city/all"
  })
}