import { awaitTo } from '@/utils/awaitTo.js'
import { server } from '@/utils/request.js'

export const getWallpaper = () => {
  return awaitTo(
    server({
      url: '/api/bing',
      method: 'GET',
    })
  )
}