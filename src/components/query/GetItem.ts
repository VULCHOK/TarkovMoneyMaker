import gql from "graphql-tag";

//Remove types to have the weapons
export const QUERY_ALL = gql`
query AllItems {
    items(
        #           Remove types to have the weapons
        types:[
            ammo,
            ammoBox,
            armor,
            armorPlate,
            backpack,
            barter,
            container,
            glasses,
            grenade,
            headphones,
            helmet,
            injectors,
            keys,
            meds,
            mods,
            pistolGrip,
            provisions,
            rig,
            suppressor
        ] ) {
        id
        name
        types
        sellFor {
            priceRUB
            source
        }
    }
}
`;