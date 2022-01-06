export interface OnePost {
  id: number
  title: string
  body: string
  userId: number
  username?:string
}

export interface UsersIdAndName {
  id: number
  username: string
}
