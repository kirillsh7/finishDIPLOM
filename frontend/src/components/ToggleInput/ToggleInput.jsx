export const ToggleInput = ({ isEdit, onChange, ...props }) => {
	return isEdit
		? <input onChange={onChange} value={props.value} {...props} />
		: <p >{props?.type === 'password' ? '******' : props?.value}</p>
}