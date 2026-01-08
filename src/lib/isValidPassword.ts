export async function isValidPassword(password: string, hashedPassword: string){
  const hashed = await hashPassword(password)
  console.log("password hash is", hashed)
  return hashed === hashedPassword
}

async function hashPassword(password: string){
    const arrayBuffer = await crypto.subtle.digest("SHA-512", new TextEncoder().encode(password))

    return Buffer.from(arrayBuffer).toString("base64")
} 