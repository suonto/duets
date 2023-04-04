/**
 * Receive a prefix P and an existing type T.
 *
 * Create a new type that has all properties of T but
 * with all property names prefixed with P
 */
export type Prefixed<T, P extends string> = {
  [K in keyof T as K extends string ? `${P}${K}` : never]: T[K];
};

/**
 * Personal food texture preferences that apply to any food.
 * A person either prefers their food in the given texture or they don't.
 */
const foodTexturePreferences = {
  stick: true,
  ball: true,
  soup: false,
};

type FishFoodTexturePreferences = Prefixed<
  typeof foodTexturePreferences,
  "fish_"
>;
type FoodTexturePreferencesKey = keyof typeof foodTexturePreferences;
type Preference<T, K extends keyof T> = T[K];
type K = keyof FishFoodTexturePreferences;

/**
 * Food texture preferences that are specific to fish being the main ingredient.
 */
const fishFoodTexturePreferences: FishFoodTexturePreferences = (
  Object.entries(foodTexturePreferences) as [
    FoodTexturePreferencesKey,
    (typeof foodTexturePreferences)[FoodTexturePreferencesKey]
  ][]
).reduce((result, [key, value]) => {
  result[`fish_${key}`] = value;
  return result;
}, {} as Record<K, Preference<FishFoodTexturePreferences, K>>);

/**
 * Editor autocompletes prefixed property names.
 * Nontrivial behaviour to achieve.
 */
console.log(fishFoodTexturePreferences.fish_stick);
console.log(fishFoodTexturePreferences.fish_ball);
console.log(fishFoodTexturePreferences.fish_soup);
