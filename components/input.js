import { Form } from "react-bootstrap";

function Control ({ type = "text", onChange, onBlur, value, name, options }) {
  if (type === "select") {
    return (
      <Form.Select
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
      >
        {
          options.map((option, index) => {
            const {
              title,
              value,
              disabled,
            } = option;

            return (
              <option
                key={index}
                value={value}
                disabled={disabled}
              >
                {title}
              </option>
            )
          })
        }
      </Form.Select>
    )
  }

  return (
    <Form.Control
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
    />
  )
}

export default function Input ({ className, label, type = "text", onChange, onBlur, value, name, error, options }) {
  return (
    <Form.Group className={className}>
      <Form.Label>{label}</Form.Label>

      <Control
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
        options={options}
      />
      
      {
        !!error && (
          <Form.Text className="text-danger">
            {error}
          </Form.Text>
        )
      }
    </Form.Group>
  )
}