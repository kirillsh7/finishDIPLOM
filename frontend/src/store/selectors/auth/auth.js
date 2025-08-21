export const isAuthenticatedSelector = state => state.auth.isAuthenticated

export const userSelector = state => state.auth.user

export const userLoginSelector = state => state.auth.userLogin

export const loadingSelector = state => state.auth.loading

export const errorSelector = state => state.auth.error

export const userCreatedDateSelector = state => state.auth.userCreatedDate