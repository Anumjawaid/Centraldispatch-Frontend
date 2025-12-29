let TEST_URL="http://localhost:3000"
let PROD_URL="https://y-1yfuvom3j-jiaabid98-gmailcoms-projects.vercel.app"
let URL=TEST_URL
// AUTH API'S
export const REGISTRATION=URL+"/api/auth/register"
export const LOGIN=URL+"/api/auth/login"
export const GET_PROFILE=URL+"/api/auth/me"
export const VERIFY=URL+"/api/auth/verify"
export const UPDATE_PASSWORD=URL+"/api/auth/update-password"
// USER API'S
export const GET_USER_INFO=URL+"/users/"
// POST API'S
export const POSTS=URL+"/api/post"
export const GET_CARRIER=URL+"/api/post/get-carriers"
export const ASSIGN_DISPATCH=URL+"/api/post/assign-dispatch"
export const REMOVE_ASSIGNMENT=URL+"/api/post/remove-assignment"
