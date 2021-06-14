import { useAxios } from '@vue-composable/axios'

const accessToken = 'Put your access token here'

const baseUrl = 'https://reqres.in/api'
const authHeader = {
  Authorization: `Bearer ${accessToken}`,
}

const { data, loading, exec, status } = useAxios()

const getUser = async (userID: number) => {
  console.log('getUser', userID)
  return exec({
    method: 'GET',
    url: `${baseUrl}/${userID}`,
    headers: { ...authHeader },
  })
}

export { data, loading, status, getUser }
