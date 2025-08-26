import { Input } from '@components'
export const ToggleInput = ({ isEdit, onChange, ...props }) => {
	return isEdit
		? <Input onChange={onChange} value={props.value} {...props} />
		: <p >{props?.type === 'password' ? '******' : props?.value}</p>
}