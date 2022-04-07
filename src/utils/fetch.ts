export async function Fetch<T>(
  url: string,
  options: {
    method?: 'get' | 'post' | 'put' | 'delete'
    authorization?: string
  }
): Promise<T | undefined> {
  const res = await fetch(url, {
    method: options.method || 'get',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: options.authorization || '',
    },
  })
  if (!res.ok) {
    return
  }
  const data: T = (await res.json()) as T

  return data
}
