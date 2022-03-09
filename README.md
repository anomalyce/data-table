# Data-Table
A Vue 3 component based on the Composition API for easily presenting data in a table-esque manner.

```bash
npm install @anomalyce/data-table
```

#### Feature Support
- [x] Dynamic headings
- [x] Custom column appearance
- [ ] Sorting
- [ ] Filtering
- [ ] Pagination

<br>

## Usage
The data-table component consists of the main component, `<data-table.table />` and two sub-components;

+ `<data-table.heading />`
+ `<data-table.item />`

The heading and item components must be immediate children of the data-table component itself. The number of heading components dictate the amount of columns your table will end up with, and their names dictate the respective slot names of all the item components. Below is an example of how to use the component, any component options can be found further down.

```html
<script setup>
  import { ref } from 'vue'
  import DataTable from '@anomalyce/data-table'

  const data = ref([
    {
      city: 'Gothenburg',
      country: 'Sweden',
    },
    {
      city: 'London',
      country: 'England',
    },
    {
      city: 'Turin',
      country: 'Italy',
    },
  ])
</script>

<template>
  <h1>Example Data-Table</h1>

  <data-table.table>
    <data-table.heading name="city">
      <strong>City</strong>
    </data-table.heading>

    <data-table.heading name="country">
      Country
    </data-table.heading>

    <data-table.item v-for="(item, index) in data" :key="index">
      <template #city>
        <span style="color: blue;">
          {{ item.city }}
        </span>
      </template>

      <template #default="{ column }">
        <span v-if="item[column]">
          {{ item[column] }}
        </span>

        <span v-else>
          &mdash;
        </span>
      </template>
    </data-table.item>
  </data-table.table>
</template>
```

<br>

## Configuration

### Table Component
#### CSS
The `<data-table.table />` component has a base class of `data-table`.

#### Parameters
**Property**|**Type**|**Required**|**Default Value**|**Description**
:----|:----|:----|:----|:----
css|boolean|false|true|Whether to add a very limited amount of CSS for the grid layout or not.

<br>

### Heading Component
#### CSS
The `<data-table.heading />` component has a base class of `data-table-heading`. All headings get wrapped inside of a container with the `data-table-row` & `data-table-headings` classes.

#### Parameters
**Property**|**Type**|**Required**|**Default Value**|**Description**
:----|:----|:----|:----|:----
name|string|true||The name of the column, used for customising the apperance of an item column

<br>

### Item Component
#### CSS
The `<data-table.item />` component has a base class of `data-table-column` and receives the `data-table-column--default` class whenever no custom slot has been declared for it. All item components get wrapped in a row container with the `data-table-row` class.

#### HTML Attributes
In addition to the classes, the `[data-table-column="<name>"]` attribute is added with the name of the relevant column heading.

#### Column Appearance
If you would like to customise the appearance of a specific column, you may create a custom vue template slot for it, based on the column heading name.

```html
<data-table.item>
  <template #country>
    <a :href="`https://wikipedia.org/${item.country}`" target="_blank" rel="noopener noreferrer">
      {{ item.country }}
    </a>
  </template>

  <template #default="{ column }">
    {{ item[column] }}
  </template>
</data-table.item>
```
