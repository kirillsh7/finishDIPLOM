export const Input = ({ onChange, value, ...props }) => {
	return <input onChange={onChange} value={value}  {...props} />
}