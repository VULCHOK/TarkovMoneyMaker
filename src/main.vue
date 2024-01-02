<template>
  <div>
    <VLoader v-if="itemsLoading" />


    <div v-else>
      <!-- Dump the data in the HTML -->
      <DataTable
          :columns="columns"
          :data="flattenedItems"
          :options="{ pageLength: 25 }"
          class="display"
          width="100%"
      >
      <thead>
      <tr>
        <th v-for="name in columns">{{ name.data }}</th>
      </tr>
      </thead>
      <tfoot>
      <tr>
        <th v-for="name in columns">{{ name.data }}</th>
      </tr>
      </tfoot>
      </DataTable>
    </div>
  </div>
</template>

<style>
/* ... (same as before) ... */
</style>

<script setup>
import VLoader from "@/components/VLoader.vue";
import { ref, watchEffect } from 'vue';
import { useQuery } from "@vue/apollo-composable";
import { QUERY_ALL } from "@/components/query/index.ts";
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';

DataTable.use(DataTablesCore);

const columns = [
  { data: 'name' },
  { data: 'prapor' },
  { data: 'praporBenef' }, // Append 'Benef' for this column
  { data: 'therapist' },
  { data: 'therapistBenef' }, // Append 'Benef' for this column
  { data: 'fence' },
  { data: 'fenceBenef' }, // Append 'Benef' for this column
  { data: 'skier' },
  { data: 'skierBenef' }, // Append 'Benef' for this column
  { data: 'peacekeeper' },
  { data: 'peacekeeperBenef' }, // Append 'Benef' for this column
  { data: 'mechanic' },
  { data: 'mechanicBenef' }, // Append 'Benef' for this column
  { data: 'ragman' },
  { data: 'ragmanBenef' }, // Append 'Benef' for this column
  { data: 'jaeger' },
  { data: 'jaegerBenef' }, // Append 'Benef' for this column
  { data: 'fleaMarket' },
];

const {
  result: items,
  loading: itemsLoading,
  error: isItemsError,
} = useQuery(QUERY_ALL);

const flattenedItems = ref([]);

// Helper function to get the comparison with fleaMarket for a specific sellFor source
const getComparisonWithFleaMarket = (item, sellForSource) => {
  const sellForEntry = item.sellFor.find(entry => entry.source === sellForSource);
  const fleaMarketEntry = item.sellFor.find(entry => entry.source === "fleaMarket");

  if (sellForEntry && fleaMarketEntry) {
    const comparison = sellForEntry.priceRUB - fleaMarketEntry.priceRUB;
    return comparison.toFixed(2); // You can adjust the formatting as needed
  } else {
    return "0";
  }
};
const getPrice = (item, source) => {
  const price = item.sellFor.find(entry => entry.source === source);
   return price ? price.priceRUB : 0;
};

// Watch for changes in the GraphQL response and update the flattenedItems
watchEffect(async () => {
  if (items.value && items.value.items) {
    flattenedItems.value = await Promise.all(items.value.items.map(async (item) => {
      const sellForComparisons = {
        prapor: await getPrice(item, 'prapor'),
        therapist: await getPrice(item, 'therapist'),
        fence: await getPrice(item, 'fence'),
        skier: await getPrice(item, 'skier'),
        peacekeeper: await getPrice(item, 'peacekeeper'),
        mechanic: await getPrice(item, 'mechanic'),
        ragman: await getPrice(item, 'ragman'),
        jaeger: await getPrice(item, 'jaeger'),
        praporBenef: await getComparisonWithFleaMarket(item, 'prapor'),
        therapistBenef: await getComparisonWithFleaMarket(item, 'therapist'),
        fenceBenef: await getComparisonWithFleaMarket(item, 'fence'),
        skierBenef: await getComparisonWithFleaMarket(item, 'skier'),
        peacekeeperBenef: await getComparisonWithFleaMarket(item, 'peacekeeper'),
        mechanicBenef: await getComparisonWithFleaMarket(item, 'mechanic'),
        ragmanBenef: await getComparisonWithFleaMarket(item, 'ragman'),
        jaegerBenef: await getComparisonWithFleaMarket(item, 'jaeger'),
        fleaMarket: await getPrice(item, "fleaMarket"),
      };

      return {
        name: item.name,
        ...sellForComparisons,
      };
    }));
  }
});
</script>
<style>
@import 'datatables.net-dt';
</style>