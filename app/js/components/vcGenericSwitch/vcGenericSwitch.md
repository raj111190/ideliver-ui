VcGenericSwitch example:

```js
<div style={{ height: '80px' }}>
  <VcGenericSwitch value={false} onChange={e => console.log('CHANGEEEE', e)}>
    <VcDatapoint label="Example">Here are the alerts</VcDatapoint>
    <VcAlertsCard
      alerts={[
        { timestamp: '28 March 10:00', value: 'Test Alert 1 lalalal' },
        { timestamp: '05 April 12:00', value: 'Test Alert 2 Trololo' },
        { timestamp: '02 May 09:00', value: 'Test Alert 3 iiiihiiii' },
      ]}
    />
    <VcToggle />
  </VcGenericSwitch>
</div>
```
