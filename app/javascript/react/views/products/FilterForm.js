import React from 'react';
import { Form, Field } from 'redux-form';
import Grid from '@material-ui/core/Grid';

const FilterForm = props => {

  const { handleSubmit, submitForm } = props;

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Grid container spacing={4}>
        <Grid item>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="Search by name"
          />
        </Grid>
        <Grid item>
          <div style={{ display: 'flex' }}>
            <Field
              name="is_active"
              id="is_active"
              component="input"
              type="checkbox"
            />
            <label htmlFor="employed">Active</label>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};
export default FilterForm;
