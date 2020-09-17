VcReadingsCard example:

```js
<VcReadingsCard
  header="Fetal Heart Rate"
  funcComponent={<VcButton value="test" />}
  presentationalComponent={
    <VcChart
      xDataKey={['Fetal Heart Rate']}
      yDataKey="time"
      topLabelDataKey="liquor"
      bottomLabelDataKey="moulding"
      topLabelColors={{
        I: 'mediumaquamarine',
        C: 'lightsteelblue',
        M: 'burlywood',
        B: 'lightpink',
      }}
      bottomLabelColors={{
        '0': 'mediumaquamarine',
        '+': 'lightsteelblue',
        '++': 'burlywood',
        '+++': 'lightpink',
      }}
      value={[
        { time: '9:00' },
        { time: '10:00', 'Fetal Heart Rate': 140, liquor: 'C', moulding: '+' },
        { time: '11:00', 'Fetal Heart Rate': 150 },
        { time: '12:00', 'Fetal Heart Rate': 145, irregular: true },
        {
          time: '13:00',
          'Fetal Heart Rate': 140,
          irregular: true,
          liquor: 'B',
          moulding: '++',
        },
        { time: '14:00', 'Fetal Heart Rate': 160 },
        { time: '15:00', 'Fetal Heart Rate': 180 },
        { time: '16:00', 'Fetal Heart Rate': 180 },
        { time: '17:00' },
      ]}
    />
  }
/>
```
