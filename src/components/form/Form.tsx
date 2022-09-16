import './form.css';

import React from 'react';

interface IFormContext {
  errors: IErrors;
  values: IValues;
  setValue?: (fieldName: string, value: any) => void;
  validate?: (fieldName: string, value: any) => void;
}

const FormContext = React.createContext<IFormContext>({
  errors: {},
  values: {},
});

export interface ISubmitResult {
  success: boolean;
  errors?: IErrors;
}

interface IErrors {
  [key: string]: string[];
}

export type Validator = (
  fieldName: string,
  values: IValues,
  args?: any
) => string;

export const required: Validator = (
  fieldName: string,
  values: IValues,
  args?: any
): string =>
  values[fieldName] === undefined ||
  values[fieldName] === null ||
  values[fieldName] === ''
    ? 'This must be populated'
    : '';

export const minLength: Validator = (
  fieldName: string,
  values: IValues,
  length: number
): string =>
  values[fieldName] && values[fieldName].length < length
    ? `This must be at least ${length} characters`
    : '';

interface IValidation {
  validator: Validator;
  arg?: any;
}
interface IValidationProp {
  [key: string]: IValidation | IValidation[];
}

export interface IValues {
  [key: string]: any;
}

interface IFieldProps {
  name: string;
  label: string;
  type?: 'Text' | 'Email' | 'Select' | 'TextArea';
  options?: string[];
}

interface IFormProps {
  defaultValues: IValues;
  validationRules: IValidationProp;
  onSubmit: (values: IValues) => Promise<ISubmitResult>;
  children: React.ReactNode;
}

interface IState {
  values: IValues;
  errors: IErrors;
  submitting: boolean;
  submitted: boolean;
}

const Field: React.FC<IFieldProps> = props => {
  const { name, label, type, options } = props;
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
    context: IFormContext
  ) => {
    if (context.setValue) {
      context.setValue(props.name, e.currentTarget.value);
    }
  };
  const handleBlur = (
    e:
      | React.FocusEvent<HTMLInputElement>
      | React.FocusEvent<HTMLTextAreaElement>
      | React.FocusEvent<HTMLSelectElement>,
    context: IFormContext
  ) => {
    if (context.validate) {
      context.validate(props.name, e.currentTarget.value);
    }
  };

  const context = React.useContext(FormContext);

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      {(type === 'Text' || type === 'Email') && (
        <input
          type={type.toLowerCase()}
          id={name}
          value={context.values[name]}
          onChange={e => handleChange(e, context)}
          onBlur={e => handleBlur(e, context)}
        />
      )}
      {type === 'TextArea' && (
        <textarea
          id={name}
          value={context.values[name]}
          onChange={e => handleChange(e, context)}
          onBlur={e => handleBlur(e, context)}
        />
      )}
      {type === 'Select' && (
        <select
          value={context.values[name]}
          onChange={e => handleChange(e, context)}
          onBlur={e => handleBlur(e, context)}
        >
          {options &&
            options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
      )}
      {context.errors[name] &&
        context.errors[name].length > 0 &&
        context.errors[name].map(error => (
          <span key={error} className="form-error">
            {error}
          </span>
        ))}
    </div>
  );
};

type IForm<P = unknown> = React.FC<P> & {
  Field: typeof Field;
};

export const Form: IForm<IFormProps> = props => {
  const errors: IErrors = {};
  Object.keys(props.defaultValues).forEach(fieldName => {
    errors[fieldName] = [];
  });
  const [state, setState] = React.useReducer(
    (state: IState, newState: Partial<IState>): IState => {
      return { ...state, ...newState };
    },
    {
      errors,
      submitted: false,
      submitting: false,
      values: props.defaultValues,
    }
  );
  const setValue = (fieldName: string, value: any) => {
    const newValues = { ...state.values, [fieldName]: value };
    setState({ values: newValues });
  };

  const validate = (fieldName: string, value: any): string[] => {
    const rules = props.validationRules[fieldName];
    const errors: string[] = [];
    if (Array.isArray(rules)) {
      rules.forEach(rule => {
        const error = rule.validator(fieldName, state.values, rule.arg);
        if (error) {
          errors.push(error);
        }
      });
    } else {
      if (rules) {
        const error = rules.validator(fieldName, state.values, rules.arg);
        if (error) {
          errors.push(error);
        }
      }
    }
    const newErrors = { ...state.errors, [fieldName]: errors };
    setState({ errors: newErrors });
    return errors;
  };

  const validateForm = (): boolean => {
    const errors: IErrors = {};
    let haveError: boolean = false;
    for (const fieldName of Object.keys(props.defaultValues)) {
      errors[fieldName] = validate(fieldName, state.values[fieldName]);
      if (errors[fieldName].length > 0) {
        haveError = true;
      }
    }
    setState({ errors });
    return !haveError;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setState({ submitting: true });
      const result = await props.onSubmit(state.values);
      setState({
        errors: result.errors || {},
        submitted: result.success,
        submitting: false,
      });
    }
  };

  const context: IFormContext = {
    errors: state.errors,
    setValue: setValue,
    validate: validate,
    values: state.values,
  };

  return (
    <FormContext.Provider value={context}>
      <form className="form" noValidate={true} onSubmit={handleSubmit}>
        {props.children}
        <div className="form-group">
          <button type="submit" disabled={state.submitting || state.submitted}>
            Submit
          </button>
        </div>
      </form>
    </FormContext.Provider>
  );
};

Field.defaultProps = {
  type: 'Text',
};

Form.Field = Field;
