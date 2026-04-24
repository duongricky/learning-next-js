import bcrypt from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret-change-in-prod"
)

export function hashPassword(plain) {
  return bcrypt.hashSync(plain, 10)
}

export function comparePassword(plain, hash) {
  return bcrypt.compareSync(plain, hash)
}

export async function signToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET)
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload
  } catch {
    return null
  }
}
