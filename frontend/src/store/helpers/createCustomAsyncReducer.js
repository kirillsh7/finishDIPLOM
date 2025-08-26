export const createCustomAsyncReducer = (asyncThunk, options = {}) => {
	const {
		loadingKey = 'loading',
		onPending = (state) => {
			state[loadingKey] = true
			state.error = null
		},
		onFulfilled = (state, action) => {
			state[loadingKey] = false
			if (options.onFulfilled) {
				options.onFulfilled(state, action)
			}
		},
		onRejected = (state, action) => {
			state[loadingKey] = false
			state.error = action.payload
			return state
		}
	} = options

	return (builder) => {
		builder
			.addCase(asyncThunk.pending, onPending)
			.addCase(asyncThunk.fulfilled, onFulfilled)
			.addCase(asyncThunk.rejected, onRejected)
	}
}