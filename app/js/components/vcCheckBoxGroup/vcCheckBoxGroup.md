VcCheckBoxGroup example:

```js
<VcCheckBoxGroup
  title="select an option"
  helper={true}
  helperText="select only one"
  options={[
    { value: 'option a' },
    { value: 'option b', color: 'secondary' },
    { value: 'option c', indeterminate: true },
    { value: 'option d', disabled: true },
  ]}
/>
```
