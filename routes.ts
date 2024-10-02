/**
 * An array of routes that are accesible for public 
 * these route do not require authentication 
 * @type {string[]}
 */
export const publicRoutes =[
         "/"
]

/**
 * An array of routes that are used for authentication  
 * these routes will  redirect logged users to /settings       
 * @type {string[]}
 */
export const authRoutes =[
         "/auth/login",
         "/auth/register",
]

/**
 * the prefix for API authentication routes           
 * routes that start with this prefix are used for API authentication purposes 
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth"


/**
 * the default redirect path after logging in 
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"