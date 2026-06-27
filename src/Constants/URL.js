let TEST_URL="http://localhost:3000"
// let PROD_URL="https://y-jiaabid98-4770-jiaabid98-gmailcoms-projects.vercel.app"
let PROD_URL="http://y-2ct3x453t-jiaabid98-gmailcoms-projects.vercel.app"
// let URL=PROD_URL
let URL=TEST_URL
// AUTH API'S
export const REGISTRATION=URL+"/api/auth/register"
export const LOGIN=URL+"/api/auth/login"
export const VERIFY_OTP=URL+"/api/auth/verify-otp"
export const GET_PROFILE=URL+"/api/auth/me"
export const VERIFY=URL+"/api/auth/verify"

export const UPDATE_PASSWORD=URL+"/api/auth/update-password"
// USER API'S
export const GET_USER_INFO=URL+"/users/"
export const GET_USER=URL+"/api/users"
// POST API'S
export const POSTS=URL+"/api/post"
export const ALL_POSTS=URL+"/api/post/all"
export const CHATS=URL+"/api/chats"

export const GET_CARRIER=URL+"/api/post/get-carriers"
export const ASSIGN_DISPATCH=URL+"/api/post/assign-dispatch"
export const REMOVE_ASSIGNMENT=URL+"/api/post/remove-assignment"
