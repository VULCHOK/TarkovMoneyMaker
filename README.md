# Tarkov Money Maker

I've put together a simple price comparator that shows the prices of items when buying from the Fleet versus selling to a vendor. 
It utilizes a [datatable](https://datatables.net/manual/vue) for sorting and dynamic tab and pulls data through a GraphQL call from [tarkov.dev](https://api.tarkov.dev/).

I don't expect to do more than what has already been done. I created this tool for a quick profit on the market.

Feel free to use it if it can be helpful to you.

## Customize configuration

You can change the call I used in ***src/components/query/GetItem.ts*** to add the weapon or create a filter for you.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
