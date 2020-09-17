VcQuestionWithDismiss example:

```js
<VcQuestionWithDismiss
  title="What's the cause of the prolonged active phase of labout?"
  timestamp="Done at 27 March 11:45"
  questionComponent={
    <VcSelectOptions
      buttonsColor="default"
      selectedColor="secondary"
      filterOptions={['CPD', 'Obstructed labour', 'Malposition']}
      selectedOptions={['CPD']}
    />
  }
/>
```
