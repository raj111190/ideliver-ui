VcTableColumnHeader example:

```js
<VcGridRow>
  <VcTableColumnHeader
    value="filterAndSort"
    sortable
    filterOptions={['test0', 'test1', 'test2', 'test3', 'test4', 'test5']}
    filtersSelected={[0, 4, 5]}
  >
    Filter and Sort
  </VcTableColumnHeader>
  <VcTableColumnHeader value="sort" direction="desc" sortable>
    Sort
  </VcTableColumnHeader>
  <VcTableColumnHeader value="onlyLabel">Only Label</VcTableColumnHeader>
</VcGridRow>
```
