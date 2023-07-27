import kRequest from "../request"

export function getHomeHotSuggests() {
  return kRequest.get({
    url: '/home/hotSuggests'
  })
}

export function getHomeCategories() {
  return kRequest.get({
    url: '/home/categories'
  })
}

export function getHomeHouseList(currentPage = 1) {
  return kRequest.get({
    url: '/home/houselist',
    params: {
      page:currentPage
    }
  })
}