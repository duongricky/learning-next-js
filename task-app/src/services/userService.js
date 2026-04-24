import * as userRepo from "@/repositories/userRepository"
import { cacheTag, cacheLife } from "next/cache"

export async function getCachedUserById(id) {
  "use cache"
  cacheTag(`user-${id}`)
  cacheLife("days")
  return userRepo.findById(id)
}
