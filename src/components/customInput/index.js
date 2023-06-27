import { Field } from 'formik';

const CustomInput = (props) => {
  const { type = 'text', name, error } = props;
  return (
    <div className={`custom-input mb-4 ${error ? 'invalid' : ''}`}>
      <Field id={name} type={type} {...props}/>
    </div>
  )
};

export default CustomInput;
