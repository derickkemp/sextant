import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Formik, useField } from "formik";

/**
 * A text input styled to material design 3
 */
function Md3TextInput({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <>
      <TextField
        error={meta.touched && meta.error}
        helperText={meta.error}
        id={field.name}
        label={label}
        name={field.name}
      />
    </>
  );
}

export default function SextantLogo() {
  return (
    <Formik
      initialValues={{}}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));

          setSubmitting(false);
        }, 400);
      }}
    >
      {(formik) => (
        <Box
          component="form"
          onReset={formik.handleReset}
          onSubmit={formik.handleSubmit}
        >
          <Md3TextInput label="Email Address" name="email" />
        </Box>
      )}
    </Formik>
  );
}
