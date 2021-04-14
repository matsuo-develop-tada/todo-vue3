// 日付を受け取り「YYYY-MM-DD」または「YYYY/MM/DD」の形式にして返す
export const formatDate = (date: string | Date, demiliter: '-' | '/'): string => {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = ('0' + (d.getMonth() + 1)).slice(-2)
  const day = ('0' + d.getDate()).slice(-2)

  return year + demiliter + month + demiliter + day
}
