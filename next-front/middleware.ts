export { default } from "next-auth/middleware"
// Just this if i want to protect all paths ⬆⬆

// protect specific paths
export const config = { matcher: ["/articles/:path*"] }

