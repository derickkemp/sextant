import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Box from "@mui/material/Box";
import { Formik, useField } from "formik";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import TextField from "@mui/material/TextField";
import { useMemo } from "react";

import Md3Button from "../md3/Md3Button/Md3Button";

/**
 * A text input styled to material design 3
 */
function Md3TextInput({ label, sx, ...props }) {
  const [field, meta] = useField(props);

  return (
    <TextField
      error={meta.touched && meta.error}
      helperText={meta.error}
      id={field.name}
      label={label}
      name={field.name}
      onChange={field.onChange}
      sx={sx}
      value={field.value}
      {...props}
    />
  );
}

export default function FeatureForm({ feature, onSubmit, sx }) {
  const id = feature.getId();

  const properties = useMemo(() => {
    const properties = {};

    feature.forEachProperty(
      (value, field) => (properties[field] = value ? value : "")
    );

    return properties;
  }, [feature]);

  /**
   * The key attribute on the Formik component is very important, it tells
   * the Formik component when the feature has changed and the initial values
   * need to be reloaded. Without it, the form will keep the values of the
   * previous feature even if enableReinitialize is set to true. See the
   * issue below for more information.
   *
   * @see {@link https://github.com/jaredpalmer/formik/issues/811#issuecomment-478586750|GitHub Issue}
   */
  return (
    <Formik
      initialValues={{
        addProperty: "",
        id: id,
        properties: properties,
      }}
      key={id}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(feature, values.properties);
        setSubmitting(false);
      }}
    >
      {({ handleReset, handleSubmit, setValues, values }) => (
        <Box
          component="form"
          onReset={handleReset}
          onSubmit={handleSubmit}
          sx={sx}
        >
          <Md3TextInput
            disabled={true}
            key={"id"}
            label={"ID"}
            name={`id`}
            sx={{ my: 1 / 4, width: "100%" }}
          />
          {Object.keys(values.properties).map((key) => (
            <Md3TextInput
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={() => {
                        const newValues = {
                          ...values,
                          properties: {
                            ...values.properties,
                          },
                        };
                        delete newValues.properties[key];
                        setValues(newValues);
                      }}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              key={`properties.${key}`}
              label={key}
              name={`properties.${key}`}
              sx={{ my: 1 / 4, width: "100%" }}
            />
          ))}

          <Md3TextInput
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    disabled={values.addProperty.length < 1}
                    edge="end"
                    onClick={() =>
                      setValues({
                        ...values,
                        properties: {
                          ...values.properties,
                          [values.addProperty]: "",
                        },
                        addProperty: "",
                      })
                    }
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            key="addProperty"
            label="Add Property"
            name="addProperty"
            sx={{ my: 1 / 4, width: "100%" }}
          />

          <Md3Button type="submit" variant="contained">
            Submit
          </Md3Button>
        </Box>
      )}
    </Formik>
  );
}
